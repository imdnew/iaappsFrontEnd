import {NavBarComponent} from './nav-bar/nav-bar.component';
import {GrowlNotificationComponent} from './growl-notification/growl-notification.component';
import {ONBOARDING_MODULE_COMPONENTS} from '../modules/onboarding';
import {VmFormComponent} from '../modules/onboarding/components/vm-form/vm-form.component';
import {COVID_MODULE_COMPONENTS} from '../modules/covid';
import {StatFormComponent} from '../modules/covid/components/stat/stat-form/stat-form.component';
import {PTBA_MODULE_COMPONENTS} from '../modules/ptba';
import {EntiteFormComponent} from '../modules/ptba/components/entite/entite-form/entite-form.component';
import {NgbdEntiteModalConfirm} from '../modules/ptba/components/entite/entite-detail/entite-detail.component';
// tslint:disable-next-line:max-line-length
import {ObjectifstrategiqueFormComponent} from '../modules/ptba/components/objectifstrategique/objectifstrategique-form/objectifstrategique-form.component';
// tslint:disable-next-line:max-line-length
import {NgbdObjectifstrategiqueModalConfirm} from '../modules/ptba/components/objectifstrategique/objectifstrategique-detail/objectifstrategique-detail.component';
import {NgbdObjectifspecifiqueModalConfirm} from '../modules/ptba/components/objectifspecifique/objectifspecifique-detail/objectifspecifique-detail.component';
import {ObjectifspecifiqueFormComponent} from '../modules/ptba/components/objectifspecifique/objectifspecifique-form/objectifspecifique-form.component';

export const COMPONENTS = [
  NavBarComponent,
  GrowlNotificationComponent,
  ONBOARDING_MODULE_COMPONENTS,
  COVID_MODULE_COMPONENTS,
  PTBA_MODULE_COMPONENTS
];

export const ENTRY_COMPONENTS = [
  VmFormComponent,
  StatFormComponent,
  EntiteFormComponent,
  NgbdEntiteModalConfirm,
  ObjectifstrategiqueFormComponent,
  NgbdObjectifstrategiqueModalConfirm,
  ObjectifspecifiqueFormComponent,
  NgbdObjectifspecifiqueModalConfirm
];
