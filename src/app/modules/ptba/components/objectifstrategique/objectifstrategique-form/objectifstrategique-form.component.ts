import { Component, OnInit } from '@angular/core';
import {SetLoading, UpsertObjectifstrategique} from './../../../states/objectifstrategique.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObjectifstrategiqueState } from './../../../states/objectifstrategique.state';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbActiveModal,   NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {EntiteState} from '../../../states/entite.state';
import {GetEntites} from '../../../states/entite.actions';

@Component({
  selector: 'app-objectifstrategique-form',
  templateUrl: './objectifstrategique-form.component.html',
  styleUrls: ['./objectifstrategique-form.component.scss']
})
export class ObjectifstrategiqueFormComponent implements OnInit {

  @Select(ObjectifstrategiqueState.formTitle) formTitle$;
  @Select(EntiteState.entites) entites$;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    libelle: new FormControl(''),
    entite: new FormControl('', Validators.required),
  });
  edit$: Observable<any>;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store
  ) { }

  ngOnInit() {
    this.form.disable();
    this.edit$ = this.store.selectOnce(ObjectifstrategiqueState.selected).pipe(
      tap(objectifstrategique => {
        if (objectifstrategique) {
        this.form.patchValue(objectifstrategique);
      }
        this.form.enable();
      })
    );
    this.store.dispatch(new GetEntites());
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
     return [new UpsertObjectifstrategique(this.form.value), new SetLoading()];

  }

}
