import { Component, OnInit } from '@angular/core';
import { SetFormTitle, ClearSelectedObjectifstrategique, FilterObjectifstrategiques } from '../../states/objectifstrategique.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectifstrategiqueFormComponent } from '../../components/objectifstrategique/objectifstrategique-form/objectifstrategique-form.component';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../states/auth/auth.state';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';



import { Select } from '@ngxs/store';
import { ObjectifstrategiqueState } from '../../states/objectifstrategique.state';
import {PageHeadState} from '../../../../states/page-head/page-head.state';
import {SetPageHead} from '../../../../states/page-head/page-head.actions';
@Component({
  selector: 'app-objectifstrategiques',
  templateUrl: './objectifstrategiques.component.html',
  styleUrls: ['./objectifstrategiques.component.scss']
})
export class ObjectifstrategiquesComponent implements OnInit {
  @Select(ObjectifstrategiqueState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(ObjectifstrategiqueState.selected) objectifstrategique$;
  @Select(ObjectifstrategiqueState.objectifstrategiques) objectifstrategiques$;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private router: Router,
    private location: Location
  ) {

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
         if (event.url === '/ptba/objectifstrategiques') {
           this.store.dispatch(new ClearSelectedObjectifstrategique());
        }
      }


    });
  }

  ngOnInit() {
    this.store.dispatch(new FilterObjectifstrategiques('a'));
    // this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'MegaListe des Programmes dactvites'}));

  }


  @Dispatch()
  openModal = () => {
    const modalRef = this.modalService.open(ObjectifstrategiqueFormComponent, { backdrop: 'static', size: 'sm'});
    this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifstrategiques > Liste'}));

    return [new SetFormTitle('Ajouter Objectifstrategique'), new ClearSelectedObjectifstrategique()];
  }

}
