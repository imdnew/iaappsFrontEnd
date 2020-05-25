import {Component, OnInit} from '@angular/core';
import {ObjectifstrategiqueState} from './../../../states/objectifstrategique.state';
import {Objectifstrategique} from './../../../models/objectifstrategique';
import {Select} from '@ngxs/store';
import {AuthState} from './../../../../../states/auth/auth.state';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SelectObjectifstrategique} from './../../../states/objectifstrategique.actions';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-objectifstrategique-list',
  templateUrl: './objectifstrategique-list.component.html',
  styleUrls: ['./objectifstrategique-list.component.scss']
})
export class ObjectifstrategiqueListComponent implements OnInit {

  @Select(ObjectifstrategiqueState.objectifstrategiques) objectifstrategiques$;
  @Select(ObjectifstrategiqueState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;

  tobjectifstrategiques: Objectifstrategique[];
  page = 1;
  pageSize = 10;
  collectionSize = 5;


  constructor( private _router: Router, private _route: ActivatedRoute) {
  }


  ngOnInit() {
    this.objectifstrategiques$.subscribe((_collection) => {
      this.tobjectifstrategiques = _collection;
      this.collectionSize = _collection.length;
    });
  }

  @Dispatch()
  detail = (objectifstrategique: Objectifstrategique) => {
 this._router.navigate([ { outlets: { outletDetails: [ objectifstrategique.id ] }} ], {relativeTo: this._route });
    return new SelectObjectifstrategique(objectifstrategique);
  }


  get objectifstrategiques(): Objectifstrategique[] {

    return this.tobjectifstrategiques
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

}
