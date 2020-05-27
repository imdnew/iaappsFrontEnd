import {PageHeadState} from './page-head/page-head.state';
import {ClickState} from './click/click.state';
import {UserState} from './user/user.state';
import {AuthState} from './auth/auth.state';
import {GrowlNotificationState} from './growl-notification/growl-notification.state';
import {VmState} from '../modules/onboarding/states/vm.state';
import {StatState} from '../modules/covid/states/stat.state';
import {EntiteState} from '../modules/ptba/states/entite.state';
import {ObjectifstrategiqueState} from '../modules/ptba/states/objectifstrategique.state';
import {ObjectifspecifiqueState} from '../modules/ptba/states/objectifspecifique.state';

export const STATES = [
  PageHeadState,
  ClickState,
  UserState,
  AuthState,
  GrowlNotificationState,
  // MITTE : Modifier à partir d'ici
  VmState,
  StatState,
  EntiteState,
  ObjectifstrategiqueState,
  ObjectifspecifiqueState
];
