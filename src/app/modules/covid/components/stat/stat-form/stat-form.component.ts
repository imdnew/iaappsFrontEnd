import { Component, OnInit } from '@angular/core';
import {SetLoading, UpsertStat} from './../../../states/stat.actions';
import { Stat } from './../../../models/stat';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StatState } from './../../../states/stat.state';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbActiveModal,   NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stat-form',
  templateUrl: './stat-form.component.html',
  styleUrls: ['./stat-form.component.scss']
})
export class StatFormComponent implements OnInit {

  @Select(StatState.formTitle) formTitle$;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', Validators.required),
    telephone: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
  });
  edit$: Observable<any>;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store
  ) { }

  ngOnInit() {
    this.form.disable();
    this.edit$ = this.store.selectOnce(StatState.selected).pipe(
      tap(stat => {
        if (stat) {
        this.form.patchValue(stat);
      }
        this.form.enable();
      })
    );
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  get disabled() {
    return this.form.disabled || this.form.invalid;
  }

  @Dispatch()
  save = () => {
    this.activeModal.dismiss();
    /*this.form.controls['sexe'].setValue(((this.form.controls['sexe'].value).toLowerCase()));
    this.form.controls['localite'].setValue(((this.form.controls['localite'].value).toLowerCase()));
    this.form.controls['typeDeclaration'].setValue(((this.form.controls['typeDeclaration'].value).toLowerCase()));*/
   // this.store.dispatch(new SelectStat(this.form.value));
    return [new UpsertStat(this.form.value), new SetLoading()];

  }

}
