import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {ClearSelectedObjectifspecifique, FilterObjectifspecifiques} from '../../../states/objectifspecifique.actions';


@Component({
  selector: 'app-objectifspecifique-filter',
  templateUrl: './objectifspecifique-filter.component.html',
  styleUrls: ['./objectifspecifique-filter.component.scss']
})
export class ObjectifspecifiqueFilterComponent implements OnInit {


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
        this.store.dispatch(new ClearSelectedObjectifspecifique());
        this.store.dispatch(new FilterObjectifspecifiques(query));
      })
    );
  }
}
