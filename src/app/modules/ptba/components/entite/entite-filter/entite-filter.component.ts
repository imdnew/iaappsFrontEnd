import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {ClearSelectedEntite, FilterEntites} from '../../../states/entite.actions';


@Component({
  selector: 'app-entite-filter',
  templateUrl: './entite-filter.component.html',
  styleUrls: ['./entite-filter.component.scss']
})
export class EntiteFilterComponent implements OnInit {


  form: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required)
  });

  queryValueChanges$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.queryValueChanges$ = this.form.controls['query'].valueChanges.pipe(
      tap(query => {
        this.store.dispatch(new ClearSelectedEntite());
        this.store.dispatch(new FilterEntites(query));
      })
    );
  }
}
