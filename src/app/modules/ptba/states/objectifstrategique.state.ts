import {Objectifstrategique} from '../models/objectifstrategique';
import {ObjectifstrategiqueService} from '../services/objectifstrategique.service';
import {State, Action, StateContext, Selector, NgxsOnInit, Actions, ofActionSuccessful} from '@ngxs/store';
// tslint:disable-next-line:max-line-length
import {
  SetFormTitle,
  SelectObjectifstrategique,
  DeleteObjectifstrategique,
  ClearSelectedObjectifstrategique,
  FilterObjectifstrategiques,
  SetLoading,
  SetLoaded,
  UpsertObjectifstrategique
} from './objectifstrategique.actions';
import {tap, debounceTime, switchMap, map} from 'rxjs/operators';
import {GrowlNotificationActions} from '../../../states/growl-notification/growl-notification.actions';
import {LoadableStateModel} from '../../../states/loadable/loadable';
import {SetPageHead} from '../../../states/page-head/page-head.actions';

export interface ObjectifstrategiqueStateModel extends LoadableStateModel {
  formTitle: string;
  objectifstrategiques: Objectifstrategique[];
  selected: Objectifstrategique;
  filterBy: string;
}

@State<ObjectifstrategiqueStateModel>({
  name: 'objectifstrategique',
  defaults: {
    formTitle: '',
    objectifstrategiques: [],
    selected: null,
    filterBy: '',
    loading: true,
    loaded: false
  }
})
export class ObjectifstrategiqueState implements NgxsOnInit {

  @Selector()
  static loading(state: LoadableStateModel) {
    return state.loading;
  }

  @Selector()
  static loaded(state: LoadableStateModel) {
    return state.loaded;
  }

  constructor(
    private objectifstrategiqueService: ObjectifstrategiqueService,
    private actions$: Actions
  ) {

  }

  ngxsOnInit({patchState, dispatch}: StateContext<ObjectifstrategiqueStateModel>) {

    this.actions$.pipe(
      ofActionSuccessful(FilterObjectifstrategiques),
      debounceTime(500),
      tap(() => {
        dispatch(new SetLoading());
      }),
      switchMap(filter => {
        const {payload} = filter;
        if (payload) {
          return this.objectifstrategiqueService.search(`${payload}`);
        } else {
          return this.objectifstrategiqueService.defaultList();
        }

        //  )

      }),
      map((result) => {
        return result;
      }),
      tap(objectifstrategiques => {
        patchState({
          objectifstrategiques,
          loaded: true,
          loading: false
        });
        dispatch(new SetLoaded(objectifstrategiques));
      })
    ).subscribe();
  }

  @Selector()
  static formTitle(state: ObjectifstrategiqueStateModel) {
    return state.formTitle;
  };

  @Selector()
  static objectifstrategiques(state: ObjectifstrategiqueStateModel) {
    return state.objectifstrategiques;
  };

  @Selector()
  static selected(state: ObjectifstrategiqueStateModel) {
    return state.selected;
  };

  @Action(SetFormTitle)
  setFormTitle({patchState}: StateContext<ObjectifstrategiqueStateModel>, action: SetFormTitle) {
    patchState({formTitle: action.payload});
  }

  @Action(SetLoading)
  setLoading({patchState}: StateContext<ObjectifstrategiqueStateModel>) {
    patchState({
      loaded: false,
      loading: true
    });
  }

  @Action(SetLoaded)
  setLoaded({patchState}: StateContext<ObjectifstrategiqueStateModel>, action: SetLoaded<Objectifstrategique[]>) {
    patchState({
      objectifstrategiques: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(UpsertObjectifstrategique)
  async UpsertObjectifstrategique({dispatch, getState, patchState}: StateContext<ObjectifstrategiqueStateModel>, action: UpsertObjectifstrategique) {

    if (action.payload.id <= 0) {
      await this.objectifstrategiqueService.add(action.payload).pipe(tap((result) => {
        const state = getState();
        patchState({
          loaded: true,
          loading: false,
          objectifstrategiques: [result, ...state.objectifstrategiques]
        });
        dispatch(new GrowlNotificationActions.Success(`Objectifstrategique Ajoutée avec Succès!`));
      })).subscribe();
    } else {
      await this.objectifstrategiqueService.update(action.payload, action.payload.id).pipe(tap((result) => {
        const state = getState();
        const currentList = [...state.objectifstrategiques];
        const currentIndex = currentList.findIndex(item => item.id === result.id);
        currentList[currentIndex] = result;
        patchState({
          loaded: true,
          loading: false,
          objectifstrategiques: currentList
        });
        dispatch(new SelectObjectifstrategique(result));
        dispatch(new GrowlNotificationActions.Success(`Objectifstrategique modifiée avec Succès!`));
      })).subscribe();
    }
  }

  @Action(SelectObjectifstrategique)
  SelectObjectifstrategique({patchState}: StateContext<ObjectifstrategiqueStateModel>, action: SelectObjectifstrategique) {
    patchState({selected: action.payload});
  }

  @Action(FilterObjectifstrategiques)
  FilterObjectifstrategiques({patchState}: StateContext<ObjectifstrategiqueStateModel>, action: FilterObjectifstrategiques) {
    patchState({filterBy: action.payload});
  }

  @Action(ClearSelectedObjectifstrategique)
  ClearSelectedObjectifstrategique({patchState, dispatch}: StateContext<ObjectifstrategiqueStateModel>) {
    patchState({selected: null});
    dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifstrategique > Liste'}));
  }

  @Action(DeleteObjectifstrategique)
  DeleteObjectifstrategique({dispatch, getState, setState}: StateContext<ObjectifstrategiqueStateModel>, action: DeleteObjectifstrategique) {
     this.objectifstrategiqueService.delete(action.payload).pipe(
      tap((d) => {
         const state = getState();
        const filteredArray = state.objectifstrategiques.filter(item => item.id !== action.payload);
        setState({
          ...state,
          objectifstrategiques: filteredArray,
          loaded: true,
          loading: false,
        });
        dispatch(new GrowlNotificationActions.Success(`Objectifstrategique Supprimé avec Succès!`));

      })
    ).subscribe();
  }

}
