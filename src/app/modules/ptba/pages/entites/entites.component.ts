import { Component, OnInit } from '@angular/core';
import { SetFormTitle, ClearSelectedEntite, FilterEntites } from '../../states/entite.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntiteFormComponent } from '../../components/entite/entite-form/entite-form.component';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../states/auth/auth.state';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';



import { Select } from '@ngxs/store';
import { EntiteState } from '../../states/entite.state';
import {PageHeadState} from '../../../../states/page-head/page-head.state';
import {SetPageHead} from '../../../../states/page-head/page-head.actions';
@Component({
  selector: 'app-entites',
  templateUrl: './entites.component.html',
  styleUrls: ['./entites.component.scss']
})
export class EntitesComponent implements OnInit {
  @Select(EntiteState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(EntiteState.selected) entite$;
  @Select(EntiteState.entites) entites$;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private router: Router,
    private location: Location
  ) {

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
         if (event.url === '/ptba/entites') {
           this.store.dispatch(new ClearSelectedEntite());
        }
      }


    });
  }

  ngOnInit() {
    this.store.dispatch(new FilterEntites('a'));
    // this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'MegaListe des Programmes dactvites'}));

  }


  @Dispatch()
  openModal = () => {
    const modalRef = this.modalService.open(EntiteFormComponent, { backdrop: 'static', size: 'sm'});
    this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Entites > Liste'}));

    return [new SetFormTitle('Ajouter Entite'), new ClearSelectedEntite()];
  }

}
