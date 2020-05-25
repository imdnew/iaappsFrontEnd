import { Component, OnInit } from '@angular/core';
import {SetLoading, UpsertEntite} from './../../../states/entite.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntiteState } from './../../../states/entite.state';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbActiveModal,   NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entite-form',
  templateUrl: './entite-form.component.html',
  styleUrls: ['./entite-form.component.scss']
})
export class EntiteFormComponent implements OnInit {

  @Select(EntiteState.formTitle) formTitle$;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    sigle: new FormControl('', Validators.required),
    nom: new FormControl(''),
  });
  edit$: Observable<any>;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store
  ) { }

  ngOnInit() {
    this.form.disable();
    this.edit$ = this.store.selectOnce(EntiteState.selected).pipe(
      tap(entite => {
        if (entite) {
        this.form.patchValue(entite);
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
    /*this.form.controls['sexe'].setValue(((this.form.controls['sexe'].value).toLowerCase()));
    this.form.controls['typeDeclaration'].setValue(((this.form.controls['typeDeclaration'].value).toLowerCase()));*/
   // this.store.dispatch(new SelectStat(this.form.value));
     return [new UpsertEntite(this.form.value), new SetLoading()];

  }

}
