import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {ClearSelectedStat, FilterStats} from '../../../states/stat.actions';


@Component({
  selector: 'app-stat-filter',
  templateUrl: './stat-filter.component.html',
  styleUrls: ['./stat-filter.component.scss']
})
export class StatFilterComponent implements OnInit {


  form: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required)
  })

  queryValueChanges$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.queryValueChanges$ = this.form.controls['query'].valueChanges.pipe(
      tap(query => {
        this.store.dispatch(new ClearSelectedStat());
        this.store.dispatch(new FilterStats(query))
      })
    )
  }
}
