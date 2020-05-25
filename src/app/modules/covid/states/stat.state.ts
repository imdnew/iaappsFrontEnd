import {Stat} from './../models/stat';
import {StatService} from './../services/stat.service';
import {State, Action, StateContext, Selector, NgxsOnInit, Actions, ofActionSuccessful} from '@ngxs/store';
import {SetFormTitle, SelectStat, DeleteStat, ClearSelectedStat, FilterStats, SetLoading, SetLoaded, UpsertStat} from './stat.actions';
import {tap, debounceTime, switchMap, map} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import * as _ from 'lodash';
import {GrowlNotificationActions} from '../../../states/growl-notification/growl-notification.actions';
import {LoadableStateModel} from '../../../states/loadable/loadable';

export interface StatStateModel extends LoadableStateModel {
  formTitle: string;
  stats: Stat[];
  selected: Stat;
  filterBy: string;
}

@State<StatStateModel>({
  name: 'stat',
  defaults: {
    formTitle: '',
    stats: [],
    selected: null,
    filterBy: '',
    loading: true,
    loaded: false
  }
})
export class StatState implements NgxsOnInit {

  @Selector()
  static loading(state: LoadableStateModel) {
    return state.loading;
  }

  @Selector()
  static loaded(state: LoadableStateModel) {
    return state.loaded;
  }

  constructor(
    private statService: StatService,
    private actions$: Actions
  ) {

  }

  ngxsOnInit({patchState, dispatch}: StateContext<StatStateModel>) {

    this.actions$.pipe(
      ofActionSuccessful(FilterStats),
      debounceTime(500),
      tap(() => {
        dispatch(new SetLoading());
      }),
      switchMap(filter => {
        const {payload} = filter;
        // return combineLatest(
        //this.statService.search(`${payload}`),
        if (payload) {
          return this.statService.search(`${payload}`);
        } else {
          return this.statService.defaultList();
        }

        //  )

      }),
      map((result) => {
        return result;
      }),
      tap(stats => {
        patchState({
          stats,
          loaded: true,
          loading: false
        });
        dispatch(new SetLoaded(stats));
      })
    ).subscribe();
  }

  @Selector()
  static formTitle(state: StatStateModel) {
    return state.formTitle;
  };

  @Selector()
  static stats(state: StatStateModel) {
    return state.stats;
  };

  @Selector()
  static selected(state: StatStateModel) {
    return state.selected;
  };

  @Action(SetFormTitle)
  setFormTitle({patchState}: StateContext<StatStateModel>, action: SetFormTitle) {
    patchState({formTitle: action.payload});
  }

  @Action(SetLoading)
  setLoading({patchState}: StateContext<StatStateModel>) {
    patchState({
      // stats: [],
      loaded: false,
      loading: true
    });
  }

  @Action(SetLoaded)
  setLoaded({patchState}: StateContext<StatStateModel>, action: SetLoaded<Stat[]>) {
    patchState({
      stats: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(UpsertStat)
  async upsertStat({dispatch, getState, patchState}: StateContext<StatStateModel>, action: UpsertStat) {

    if(action.payload.id<=0) {
      await this.statService.add(action.payload).pipe(tap((result) => {
        const state = getState();
        patchState({
          loaded: true,
          loading: false,
          stats: [result, ...state.stats]
        });
        dispatch(new GrowlNotificationActions.Success(`Stat Ajoutée avec Succès!`));
      })).subscribe();
    }
    else{
      await this.statService.update(action.payload,action.payload.id).pipe(tap((result) => {
        const state = getState();
        const currentList = [...state.stats];
        const currentIndex = currentList.findIndex(item => item.id === result.id);
        currentList[currentIndex] = result;
        patchState({
          loaded: true,
          loading: false,
          stats: currentList
        });
        dispatch(new SelectStat(result));
        dispatch(new GrowlNotificationActions.Success(`Stat modifiée avec Succès!`));
      })).subscribe();
    }
  }

  @Action(SelectStat)
  selectStat({patchState}: StateContext<StatStateModel>, action: SelectStat) {
    patchState({selected: action.payload});
  }

  @Action(FilterStats)
  filterStats({patchState}: StateContext<StatStateModel>, action: FilterStats) {
    patchState({filterBy: action.payload});
  }

  @Action(ClearSelectedStat)
  clearSelectedStat({patchState}: StateContext<StatStateModel>) {
    patchState({selected: null});
  }

  @Action(DeleteStat)
  deleteStat({dispatch, getState, setState}: StateContext<StatStateModel>, action: DeleteStat) {
    // alert(action.payload);
    this.statService.delete(action.payload).pipe(
      tap((d) => {
        // alert('bingo');
        const state = getState();
        const filteredArray = state.stats.filter(item => item.id !== action.payload);
        setState({
          ...state,
          stats: filteredArray,
          loaded: true,
          loading: false,
        });
        dispatch(new GrowlNotificationActions.Success(`Stat Supprimé avec Succès!`));

      })
    ).subscribe();
  }

}
