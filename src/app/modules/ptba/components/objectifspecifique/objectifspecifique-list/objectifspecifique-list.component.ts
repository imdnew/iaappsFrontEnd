import {Component, OnInit} from '@angular/core';
import {ObjectifspecifiqueState} from './../../../states/objectifspecifique.state';
import {Objectifspecifique} from './../../../models/objectifspecifique';
import {Select} from '@ngxs/store';
import {AuthState} from './../../../../../states/auth/auth.state';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SelectObjectifspecifique} from './../../../states/objectifspecifique.actions';
import { Router, ActivatedRoute } from '@angular/router';
import {of} from 'rxjs';



@Component({
  selector: 'app-objectifspecifique-list',
  templateUrl: './objectifspecifique-list.component.html',
  styleUrls: ['./objectifspecifique-list.component.scss']
})
export class ObjectifspecifiqueListComponent implements OnInit {

  @Select(ObjectifspecifiqueState.objectifspecifiques) objectifspecifiques$;
  @Select(ObjectifspecifiqueState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;

  tobjectifspecifiques: Objectifspecifique[];
  page = 1;
  pageSize = 10;
  collectionSize = 5;


  constructor( private _router: Router, private _route: ActivatedRoute) {
  }


  ngOnInit() {
    this.objectifspecifiques$.subscribe((_collection) => {
      this.tobjectifspecifiques = _collection;
      this.collectionSize = _collection.length;
    });
  }

  @Dispatch()
  detail = (objectifspecifique: Objectifspecifique) => {
 this._router.navigate([ { outlets: { outletDetails: [ objectifspecifique.id ] }} ], {relativeTo: this._route });
    return new SelectObjectifspecifique(objectifspecifique);
  }


  get objectifspecifiques(): Objectifspecifique[] {

    return this.tobjectifspecifiques
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

}
