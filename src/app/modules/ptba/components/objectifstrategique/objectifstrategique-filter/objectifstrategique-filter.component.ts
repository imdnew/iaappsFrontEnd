import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {ClearSelectedObjectifstrategique, FilterObjectifstrategiques} from '../../../states/objectifstrategique.actions';


@Component({
  selector: 'app-objectifstrategique-filter',
  templateUrl: './objectifstrategique-filter.component.html',
  styleUrls: ['./objectifstrategique-filter.component.scss']
})
export class ObjectifstrategiqueFilterComponent implements OnInit {


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
        this.store.dispatch(new ClearSelectedObjectifstrategique());
        this.store.dispatch(new FilterObjectifstrategiques(query));
      })
    );
  }
}
