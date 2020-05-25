import { Vm } from './../models/vm';
import { VmFirestore } from './../services/vm.firestore';
import { State, Action, StateContext, Selector, NgxsOnInit, Actions, ofActionSuccessful } from '@ngxs/store';
import { SetFormTitle, SelectVm, DeleteVm, ClearSelectedVm, FilterVms, SetLoading, SetLoaded, UpsertVm } from './vm.actions';
import { tap, debounceTime, switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as _ from 'lodash'
import { GrowlNotificationActions } from './../../../states/growl-notification/growl-notification.actions';
import { LoadableStateModel } from './../../../states/loadable/loadable';

export interface VmStateModel extends LoadableStateModel {
  formTitle: string;
  vms: Vm[];
  selected: Vm;
  filterBy: string;
}

@State<VmStateModel>({
  name: 'vm',
  defaults: {
    formTitle: '',
    vms: [],
    selected: null,
    filterBy: '',
    loading: true,
    loaded: false
  }
})
export class VmState implements NgxsOnInit {

  @Selector() static loading(state: LoadableStateModel) { return state.loading }
  @Selector() static loaded(state: LoadableStateModel) { return state.loaded }

  constructor(
    private vmFS: VmFirestore,
    private actions$: Actions
  ) {

  }

  ngxsOnInit({ patchState, dispatch }: StateContext<VmStateModel>) {

    this.actions$.pipe(
      ofActionSuccessful(FilterVms),
      debounceTime(500),
      tap(() => {
        dispatch(new SetLoading())
      }),
      switchMap(filter => {
        const { payload } = filter

        return combineLatest(
          this.vmFS.collection$(
           ref => ref.orderBy('nom').startAt(payload).endAt(`${payload}\uf8ff`)
           // ref => ref.orderBy('nom').startAt(payload.toUpperCase()).endAt(payload.toLowerCase() + "\uf8ff")
          ),
          this.vmFS.collection$(
            ref => ref.orderBy('adresseip').startAt(payload).endAt(`${payload}\uf8ff`)
          ),
          this.vmFS.collection$(
            ref => ref.orderBy('adresseipnum').startAt(payload).endAt(`${payload}\uf8ff`)
          )
        )

      }),
      map(([vmsByNom, vmsByadresseIp, vmsByadresseIpNum]) => {
        const deduped = _.uniqBy([...vmsByNom, ...vmsByadresseIp, ...vmsByadresseIpNum], 'id');
        return deduped
      }),
      tap(vms => {
        patchState({
          vms,
          loaded: true,
          loading: false
        })
        dispatch(new SetLoaded(vms))
      })
    ).subscribe()
  }

  @Selector()
  static formTitle(state: VmStateModel) {
    return state.formTitle
  };

  @Selector()
  static vms(state: VmStateModel) {
    return state.vms
  };

  @Selector()
  static selected(state: VmStateModel) {
    return state.selected
  };

  @Action(SetFormTitle)
  setFormTitle({ patchState }: StateContext<VmStateModel>, action: SetFormTitle) {
    patchState({ formTitle: action.payload })
  }

  @Action(SetLoading)
  setLoading({ patchState }: StateContext<VmStateModel>) {
    patchState({
     // vms: [],
      loaded: false,
      loading: true
    })
  }

  @Action(SetLoaded)
  setLoaded({ patchState }: StateContext<VmStateModel>, action: SetLoaded<Vm[]>) {
    patchState({
      vms: action.payload,
      loaded: true,
      loading: false
    })
  }

  @Action(UpsertVm)
  async upsertVm({ dispatch }: StateContext<VmStateModel>, action: UpsertVm) {
    await this.vmFS.upsert(action.payload);
    dispatch(new GrowlNotificationActions.Success(`Vm Ajoutée avec Succès!`))
  }

  @Action(SelectVm)
  selectVm({ patchState }: StateContext<VmStateModel>, action: SelectVm) {
    patchState({ selected: action.payload })
  }

  @Action(FilterVms)
  filterVms({ patchState }: StateContext<VmStateModel>, action: FilterVms) {
    patchState({ filterBy: action.payload })
  }

  @Action(ClearSelectedVm)
  clearSelectedVm({ patchState }: StateContext<VmStateModel>) {
    patchState({ selected: null })
  }

  @Action(DeleteVm)
  async deleteVm({ dispatch }: StateContext<VmStateModel>, action: DeleteVm) {
    await this.vmFS.delete(action.payload)
    dispatch(new GrowlNotificationActions.Success(`Vm Supprimé avec Succès!`))
  }

}
