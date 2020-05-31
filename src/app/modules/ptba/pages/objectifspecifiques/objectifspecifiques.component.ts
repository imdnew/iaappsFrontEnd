import { Component, OnInit } from '@angular/core';
import { SetFormTitle, ClearSelectedObjectifspecifique, FilterObjectifspecifiques } from '../../states/objectifspecifique.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectifspecifiqueFormComponent } from '../../components/objectifspecifique/objectifspecifique-form/objectifspecifique-form.component';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../states/auth/auth.state';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';



import { Select } from '@ngxs/store';
import { ObjectifspecifiqueState } from '../../states/objectifspecifique.state';
import {PageHeadState} from '../../../../states/page-head/page-head.state';
import {SetPageHead} from '../../../../states/page-head/page-head.actions';
@Component({
  selector: 'app-objectifspecifiques',
  templateUrl: './objectifspecifiques.component.html',
  styleUrls: ['./objectifspecifiques.component.scss']
})
export class ObjectifspecifiquesComponent implements OnInit {
  @Select(ObjectifspecifiqueState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(ObjectifspecifiqueState.selected) objectifspecifique$;
  @Select(ObjectifspecifiqueState.objectifspecifiques) objectifspecifiques$;

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private router: Router,
    private location: Location
  ) {

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
         if (event.url === '/ptba/objectifspecifiques') {
           this.store.dispatch(new ClearSelectedObjectifspecifique());
        }
      }


    });
  }

  ngOnInit() {
    this.store.dispatch(new FilterObjectifspecifiques('a'));
    // this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'MegaListe des Programmes dactvites'}));

  }


  @Dispatch()
  openModal = () => {
    const modalRef = this.modalService.open(ObjectifspecifiqueFormComponent, { backdrop: 'static', size: 'sm'});
    this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifspecifiques > Liste'}));

    return [new SetFormTitle('Ajouter Objectifspecifique'), new ClearSelectedObjectifspecifique()];
  }

}
