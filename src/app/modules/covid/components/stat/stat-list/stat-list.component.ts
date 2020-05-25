import {Component, OnInit} from '@angular/core';
import {StatState} from './../../../states/stat.state';
import {Stat} from './../../../models/stat';
import {Select} from '@ngxs/store';
import {AuthState} from './../../../../../states/auth/auth.state';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SelectStat} from './../../../states/stat.actions';
import { Router, ActivatedRoute } from '@angular/router';
import {SetPageHead} from '../../../../../states/page-head/page-head.actions';



@Component({
  selector: 'app-stat-list',
  templateUrl: './stat-list.component.html',
  styleUrls: ['./stat-list.component.scss']
})
export class StatListComponent implements OnInit {

  @Select(StatState.stats) stats$;
  @Select(StatState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;

  tstats: Stat[];
  page = 1;
  pageSize = 50;
  collectionSize = 5;

  constructor( private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.stats$.subscribe((test) => {
      this.tstats = test;
      this.collectionSize = test.length;
    });
  }

  @Dispatch()
  detail = (stat: Stat) => {
 this._router.navigate([ { outlets: { outletDetails: [ stat.id ] }} ], {relativeTo: this._route });
    return new SelectStat(stat);
  }


  get stats(): Stat[] {

    return this.tstats
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

}
