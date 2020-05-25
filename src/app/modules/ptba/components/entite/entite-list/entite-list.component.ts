import {Component, OnInit} from '@angular/core';
import {EntiteState} from './../../../states/entite.state';
import {Entite} from './../../../models/entite';
import {Select} from '@ngxs/store';
import {AuthState} from './../../../../../states/auth/auth.state';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SelectEntite} from './../../../states/entite.actions';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-entite-list',
  templateUrl: './entite-list.component.html',
  styleUrls: ['./entite-list.component.scss']
})
export class EntiteListComponent implements OnInit {

  @Select(EntiteState.entites) entites$;
  @Select(EntiteState.loading) loading$;
  @Select(AuthState.loggedOut) loggedOut$;

  tentites: Entite[];
  page = 1;
  pageSize = 10;
  collectionSize = 5;


  constructor( private _router: Router, private _route: ActivatedRoute) {
  }


  ngOnInit() {
    this.entites$.subscribe((_collection) => {
      this.tentites = _collection;
      this.collectionSize = _collection.length;
    });
  }

  @Dispatch()
  detail = (entite: Entite) => {
 this._router.navigate([ { outlets: { outletDetails: [ entite.id ] }} ], {relativeTo: this._route });
    return new SelectEntite(entite);
  }


  get entites(): Entite[] {

    return this.tentites
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

}
