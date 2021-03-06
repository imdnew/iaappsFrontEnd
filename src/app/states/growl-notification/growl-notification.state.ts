import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GrowlNotificationActions } from './growl-notification.actions';

export type GrowlNotificationStateModel = {
  message: string
  type: 'error' | 'success' | '';
}

@State<GrowlNotificationStateModel>({
  name: 'growlNotification',
  defaults: {
    message: '',
    type: ''
  }
})
export class GrowlNotificationState {

  @Selector()
  static message(state: GrowlNotificationStateModel) {
    return state.message
  }

  @Selector()
  static show(state: GrowlNotificationStateModel) {
    return state.message !== ''
  }

  @Selector()
  static isError(state: GrowlNotificationStateModel) {
    return state.type === 'error'
  }

  @Selector()
  static isSuccess(state: GrowlNotificationStateModel) {
    return state.type === 'success'
  }

  @Action(GrowlNotificationActions.Error)
  error({ patchState, dispatch }: StateContext<GrowlNotificationStateModel>, action: GrowlNotificationActions.Error) {
    patchState({
      message: action.payload,
      type: 'error'
    });
    setTimeout(()=>{
      dispatch(new GrowlNotificationActions.Dismiss());
    },10000);
  }

  @Action(GrowlNotificationActions.Success)
  success({ patchState, dispatch }: StateContext<GrowlNotificationStateModel>, action: GrowlNotificationActions.Success) {
    patchState({
      message: action.payload,
      type: 'success'
    });
    setTimeout(()=>{
      dispatch(new GrowlNotificationActions.Dismiss());
    },10000);
  }

  @Action(GrowlNotificationActions.Dismiss)
  dismiss({ patchState }: StateContext<GrowlNotificationStateModel>, action: GrowlNotificationActions.Dismiss) {
    patchState({
      message: '',
      type: ''
    });
  }
}
