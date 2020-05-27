import {Entite} from '../models/entite';
import {EntiteService} from '../services/entite.service';
import {State, Action, StateContext, Selector, NgxsOnInit, Actions, ofActionSuccessful} from '@ngxs/store';
// tslint:disable-next-line:max-line-length
import {
  SetFormTitle,
  SelectEntite,
  DeleteEntite,
  ClearSelectedEntite,
  FilterEntites,
  SetLoading,
  SetLoaded,
  UpsertEntite, GetEntites
} from './entite.actions';
import {tap, debounceTime, switchMap, map} from 'rxjs/operators';
import {GrowlNotificationActions} from '../../../states/growl-notification/growl-notification.actions';
import {LoadableStateModel} from '../../../states/loadable/loadable';
import {SetPageHead} from '../../../states/page-head/page-head.actions';

export interface EntiteStateModel extends LoadableStateModel {
  formTitle: string;
  entites: Entite[];
  selected: Entite;
  filterBy: string;
}

@State<EntiteStateModel>({
  name: 'entite',
  defaults: {
    formTitle: '',
    entites: [],
    selected: null,
    filterBy: '',
    loading: true,
    loaded: false
  }
})
export class EntiteState implements NgxsOnInit {

  constructor(
    private entiteService: EntiteService,
    private actions$: Actions
  ) {

  }
  @Selector()
  static loading(state: LoadableStateModel) {
    return state.loading;
  }

  @Selector()
  static loaded(state: LoadableStateModel) {
    return state.loaded;
  }

  @Selector()
  static formTitle(state: EntiteStateModel) {
    return state.formTitle;
  }
  @Selector()
  static entites(state: EntiteStateModel) {
    return state.entites;
  }
  @Selector()
  static selected(state: EntiteStateModel) {
    return state.selected;
  }
  ngxsOnInit({patchState, dispatch}: StateContext<EntiteStateModel>) {

    this.actions$.pipe(
      ofActionSuccessful(FilterEntites),
      debounceTime(500),
      tap(() => {
        dispatch(new SetLoading());
      }),
      switchMap(filter => {
        const {payload} = filter;
        if (payload) {
          return this.entiteService.search(`${payload}`);
        } else {
          return this.entiteService.defaultList();
        }

        //  )

      }),
      map((result) => {
        return result;
      }),
      tap(entites => {
        patchState({
          entites,
          loaded: true,
          loading: false
        });
        dispatch(new SetLoaded(entites));
      })
    ).subscribe();
  }

  @Action(SetFormTitle)
  setFormTitle({patchState}: StateContext<EntiteStateModel>, action: SetFormTitle) {
    patchState({formTitle: action.payload});
  }

  @Action(SetLoading)
  setLoading({patchState}: StateContext<EntiteStateModel>) {
    patchState({
      loaded: false,
      loading: true
    });
  }

  @Action(SetLoaded)
  setLoaded({patchState}: StateContext<EntiteStateModel>, action: SetLoaded<Entite[]>) {
    patchState({
      entites: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(UpsertEntite)
  async UpsertEntite({dispatch, getState, patchState}: StateContext<EntiteStateModel>, action: UpsertEntite) {

    if (action.payload.id <= 0) {
      await this.entiteService.add(action.payload).pipe(tap((result) => {
        const state = getState();
        patchState({
          loaded: true,
          loading: false,
          entites: [result, ...state.entites]
        });
        dispatch(new GrowlNotificationActions.Success(`Entite Ajoutée avec Succès!`));
      })).subscribe();
    } else {
      await this.entiteService.update(action.payload, action.payload.id).pipe(tap((result) => {
        const state = getState();
        const currentList = [...state.entites];
        const currentIndex = currentList.findIndex(item => item.id === result.id);
        currentList[currentIndex] = result;
        patchState({
          loaded: true,
          loading: false,
          entites: currentList
        });
        dispatch(new SelectEntite(result));
        dispatch(new GrowlNotificationActions.Success(`Entite modifiée avec Succès!`));
      })).subscribe();
    }
  }

  @Action(SelectEntite)
  SelectEntite({patchState}: StateContext<EntiteStateModel>, action: SelectEntite) {
    patchState({selected: action.payload});
  }

  @Action(FilterEntites)
  FilterEntites({patchState}: StateContext<EntiteStateModel>, action: FilterEntites) {
    patchState({filterBy: action.payload});
  }

  @Action(GetEntites)
  async GetEntites({patchState}: StateContext<EntiteStateModel>) {
    await this.entiteService.getAll().pipe(tap((result) => {
      patchState({
        loaded: true,
        loading: false,
        entites: result
      });
    })).subscribe();
  }

  @Action(ClearSelectedEntite)
  ClearSelectedEntite({patchState, dispatch}: StateContext<EntiteStateModel>) {
    patchState({selected: null});
    dispatch(new SetPageHead({title: 'PTBA', description: 'Entite > Liste'}));
  }

  @Action(DeleteEntite)
  DeleteEntite({dispatch, getState, setState}: StateContext<EntiteStateModel>, action: DeleteEntite) {
     this.entiteService.delete(action.payload).pipe(
      tap((d) => {
         const state = getState();
        const filteredArray = state.entites.filter(item => item.id !== action.payload);
        setState({
          ...state,
          entites: filteredArray,
          loaded: true,
          loading: false,
        });
        dispatch(new GrowlNotificationActions.Success(`Entite Supprimé avec Succès!`));

      })
    ).subscribe();
  }

}
