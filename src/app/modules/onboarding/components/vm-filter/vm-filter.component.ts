import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { FilterVms } from '../../states/vm.actions';


@Component({
  selector: 'app-vm-filter',
  templateUrl: './vm-filter.component.html',
  styleUrls: ['./vm-filter.component.scss']
})
export class VmFilterComponent implements OnInit {

  
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
        this.store.dispatch(new FilterVms(query))
      })
    )
  }
}
