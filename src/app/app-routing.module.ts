
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmsComponent } from './modules/onboarding/pages/vms/vms.component';
import { StatsComponent } from './modules/covid/pages/stats/stats.component';
import { StatDetailComponent } from './modules/covid/components/stat/stat-detail/stat-detail.component';
import { StatListComponent } from './modules/covid/components/stat/stat-list/stat-list.component';
import {EntitesComponent} from './modules/ptba/pages/entites/entites.component';
import {EntiteListComponent} from './modules/ptba/components/entite/entite-list/entite-list.component';
import {EntiteDetailComponent} from './modules/ptba/components/entite/entite-detail/entite-detail.component';
// tslint:disable-next-line:max-line-length
import {ObjectifstrategiqueDetailComponent} from './modules/ptba/components/objectifstrategique/objectifstrategique-detail/objectifstrategique-detail.component';
// tslint:disable-next-line:max-line-length
import {ObjectifstrategiqueListComponent} from './modules/ptba/components/objectifstrategique/objectifstrategique-list/objectifstrategique-list.component';
import {ObjectifstrategiquesComponent} from './modules/ptba/pages/objectifstrategiques/objectifstrategiques.component';

export const PAGE_HEADS = {
  VMS: { title: 'Ressources OnBoarding', description: 'Liste des ressources, machines virtuelles hébergées dans le cadre des projets' },
  STATS: { title: 'COVID-19', description: 'Covid19' },
  PTBAS: { title: 'PTBA', description: '' },
  };

const routes: Routes = [

  {
    path: 'vms', component: VmsComponent,
    data: PAGE_HEADS.VMS
  },
   {
   path: 'ptba/entites',
   component: EntitesComponent,
  children: [
    {
      path: '',
      component: EntiteListComponent,
      data: PAGE_HEADS.PTBAS
    },
    {
       path: ':id',
       component: EntiteDetailComponent,
       outlet: 'outletDetails',
       data: PAGE_HEADS.PTBAS
     },
   ],
   data: PAGE_HEADS.PTBAS,
 },
  {
    path: 'ptba/objectifstrategiques',
    component: ObjectifstrategiquesComponent,
    children: [
      {
        path: '',
        component: ObjectifstrategiqueListComponent,
        data: PAGE_HEADS.PTBAS
      },
      {
        path: ':id',
        component: ObjectifstrategiqueDetailComponent,
        outlet: 'outletDetails',
        data: PAGE_HEADS.PTBAS
      },
    ],
    data: PAGE_HEADS.PTBAS,
  },
  {
    path: 'covid19',
    component: StatsComponent,
    children: [
      {
        path: '',
        component: StatListComponent,
        data: PAGE_HEADS.STATS
      },
      {
        path: ':id',
        component: StatDetailComponent,
        outlet: 'outletDetails',
        data: PAGE_HEADS.STATS
      },
    ],
    data: PAGE_HEADS.STATS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
