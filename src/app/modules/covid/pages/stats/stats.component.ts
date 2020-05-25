import { Component, OnInit } from '@angular/core';
import { SetFormTitle, ClearSelectedStat, FilterStats } from './../../states/stat.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatFormComponent } from './../../components/stat/stat-form/stat-form.component';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { AuthState } from './../../../../states/auth/auth.state';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';



import { Select } from '@ngxs/store';
import { StatState } from './../../states/stat.state';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Select(StatState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;
  @Select(StatState.selected) stat$;
  @Select(StatState.stats) stats$;


  constructor(
    private modalService: NgbModal,
    private store: Store,
    private router: Router,
    private location: Location
  ) {

   /* this.router.events.subscribe(val => {
      console.log('val',val);
      console.log('Path',this.location.path());
      if (this.location.path() === "/covid19") {
        alert('bingo');
        return new ClearSelectedStat();
      }
    });*/

    this.router.events.subscribe((event: Event) => {
     /* if (event instanceof NavigationStart) {
        console.log(' navigation start');
      }*/

      if (event instanceof NavigationEnd) {
        console.log('navigation end', event.url);
        if (event.url === "/covid19") {
           this.store.dispatch(new ClearSelectedStat());
        }
      }

     /* if (event instanceof NavigationError) {
        console.log(event.error);
      }*/
    });
  }

  ngOnInit() {
    this.store.dispatch(new FilterStats('o'));
  }


  @Dispatch()
  openModal = () => {
    const modalRef = this.modalService.open(StatFormComponent, { backdrop: 'static', size: 'sm'});
    return [new SetFormTitle('Ajouter Stat'), new ClearSelectedStat()];
  }

}
