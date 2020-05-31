import {Objectifspecifique} from '../models/objectifspecifique';
import {ObjectifspecifiqueService} from '../services/objectifspecifique.service';
import {State, Action, StateContext, Selector, NgxsOnInit, Actions, ofActionSuccessful} from '@ngxs/store';
// tslint:disable-next-line:max-line-length
import {
  SetFormTitle,
  SelectObjectifspecifique,
  DeleteObjectifspecifique,
  ClearSelectedObjectifspecifique,
  FilterObjectifspecifiques,
  SetLoading,
  SetLoaded,
  UpsertObjectifspecifique,
  GetObjectifspecifiques
} from './objectifspecifique.actions';
import {tap, debounceTime, switchMap, map} from 'rxjs/operators';
import {GrowlNotificationActions} from '../../../states/growl-notification/growl-notification.actions';
import {LoadableStateModel} from '../../../states/loadable/loadable';
import {SetPageHead} from '../../../states/page-head/page-head.actions';

export interface ObjectifspecifiqueStateModel extends LoadableStateModel {
  formTitle: string;
  objectifspecifiques: Objectifspecifique[];
  selected: Objectifspecifique;
  filterBy: string;
}

@State<ObjectifspecifiqueStateModel>({
  name: 'objectifspecifique',
  defaults: {
    formTitle: '',
    objectifspecifiques: [],
    selected: null,
    filterBy: '',
    loading: true,
    loaded: false
  }
})
export class ObjectifspecifiqueState implements NgxsOnInit {

  @Selector()
  static loading(state: LoadableStateModel) {
    return state.loading;
  }

  @Selector()
  static loaded(state: LoadableStateModel) {
    return state.loaded;
  }

  constructor(
    private objectifspecifiqueService: ObjectifspecifiqueService,
    private actions$: Actions
  ) {

  }

  ngxsOnInit({patchState, dispatch}: StateContext<ObjectifspecifiqueStateModel>) {

    this.actions$.pipe(
      ofActionSuccessful(FilterObjectifspecifiques),
      debounceTime(500),
      tap(() => {
        dispatch(new SetLoading());
      }),
      switchMap(filter => {
        const {payload} = filter;
        if (payload) {
          return this.objectifspecifiqueService.search(`${payload}`);
        } else {
          return this.objectifspecifiqueService.defaultList();
        }

        //  )

      }),
      map((result) => {
        return result;
      }),
      tap(objectifspecifiques => {
        patchState({
          objectifspecifiques,
          loaded: true,
          loading: false
        });
        dispatch(new SetLoaded(objectifspecifiques));
      })
    ).subscribe();
  }

  @Selector()
  static formTitle(state: ObjectifspecifiqueStateModel) {
    return state.formTitle;
  };

  @Selector()
  static objectifspecifiques(state: ObjectifspecifiqueStateModel) {
    return state.objectifspecifiques;
  };

  @Selector()
  static selected(state: ObjectifspecifiqueStateModel) {
    return state.selected;
  };

  @Action(SetFormTitle)
  setFormTitle({patchState}: StateContext<ObjectifspecifiqueStateModel>, action: SetFormTitle) {
    patchState({formTitle: action.payload});
  }

  @Action(SetLoading)
  setLoading({patchState}: StateContext<ObjectifspecifiqueStateModel>) {
    patchState({
      loaded: false,
      loading: true
    });
  }

  @Action(SetLoaded)
  setLoaded({patchState}: StateContext<ObjectifspecifiqueStateModel>, action: SetLoaded<Objectifspecifique[]>) {
    patchState({
      objectifspecifiques: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(UpsertObjectifspecifique)
  async UpsertObjectifspecifique({dispatch, getState, patchState}: StateContext<ObjectifspecifiqueStateModel>, action: UpsertObjectifspecifique) {

    if (action.payload.id <= 0) {
      await this.objectifspecifiqueService.add(action.payload).pipe(tap((result) => {
        const state = getState();
        patchState({
          loaded: true,
          loading: false,
          objectifspecifiques: [result, ...state.objectifspecifiques]
        });
        dispatch(new GrowlNotificationActions.Success(`Objectifspecifique Ajoutée avec Succès!`));
      })).subscribe();
    } else {
      await this.objectifspecifiqueService.update(action.payload, action.payload.id).pipe(tap((result) => {
        const state = getState();
        const currentList = [...state.objectifspecifiques];
        const currentIndex = currentList.findIndex(item => item.id === result.id);
        currentList[currentIndex] = result;
        patchState({
          loaded: true,
          loading: false,
          objectifspecifiques: currentList
        });
        dispatch(new SelectObjectifspecifique(result));
        dispatch(new GrowlNotificationActions.Success(`Objectifspecifique modifiée avec Succès!`));
      })).subscribe();
    }
  }

  @Action(SelectObjectifspecifique)
  SelectObjectifspecifique({patchState}: StateContext<ObjectifspecifiqueStateModel>, action: SelectObjectifspecifique) {
    patchState({selected: action.payload});
  }

  @Action(FilterObjectifspecifiques)
  FilterObjectifspecifiques({patchState}: StateContext<ObjectifspecifiqueStateModel>, action: FilterObjectifspecifiques) {
    patchState({filterBy: action.payload});
  }

  @Action(GetObjectifspecifiques)
  async GetObjectifspecifiques({patchState}: StateContext<ObjectifspecifiqueStateModel>) {
    await this.objectifspecifiqueService.getAll().pipe(tap((result) => {
      patchState({
        loaded: true,
        loading: false,
        objectifspecifiques: result
      });
    })).subscribe();
  }

  @Action(ClearSelectedObjectifspecifique)
  ClearSelectedObjectifspecifique({patchState, dispatch}: StateContext<ObjectifspecifiqueStateModel>) {
    patchState({selected: null});
    dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifspecifique > Liste'}));
  }

  @Action(DeleteObjectifspecifique)
  DeleteObjectifspecifique({dispatch, getState, setState}: StateContext<ObjectifspecifiqueStateModel>, action: DeleteObjectifspecifique) {
     this.objectifspecifiqueService.delete(action.payload).pipe(
      tap((d) => {
         const state = getState();
        const filteredArray = state.objectifspecifiques.filter(item => item.id !== action.payload);
        setState({
          ...state,
          objectifspecifiques: filteredArray,
          loaded: true,
          loading: false,
        });
        dispatch(new GrowlNotificationActions.Success(`Objectifspecifique Supprimé avec Succès!`));

      })
    ).subscribe();
  }

}
