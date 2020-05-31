import { Component, OnInit } from '@angular/core';
import {SetLoading, UpsertObjectifspecifique} from './../../../states/objectifspecifique.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObjectifspecifiqueState } from './../../../states/objectifspecifique.state';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbActiveModal,   NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ObjectifstrategiqueState} from '../../../states/objectifstrategique.state';
import {GetObjectifstrategiques} from '../../../states/objectifstrategique.actions';

@Component({
  selector: 'app-objectifspecifique-form',
  templateUrl: './objectifspecifique-form.component.html',
  styleUrls: ['./objectifspecifique-form.component.scss']
})
export class ObjectifspecifiqueFormComponent implements OnInit {

  @Select(ObjectifspecifiqueState.formTitle) formTitle$;
  @Select(ObjectifstrategiqueState.objectifstrategiques) objectifstrategiques$;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    libelle: new FormControl(''),
    objectifstrategique: new FormControl('', Validators.required),
  });
  edit$: Observable<any>;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store
  ) { }

  ngOnInit() {
    this.form.disable();
    this.edit$ = this.store.selectOnce(ObjectifspecifiqueState.selected).pipe(
      tap(objectifspecifique => {
        if (objectifspecifique) {
        this.form.patchValue(objectifspecifique);
      }
        this.form.enable();
      })
    );
    this.store.dispatch(new GetObjectifstrategiques());
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
     return [new UpsertObjectifspecifique(this.form.value), new SetLoading()];

  }

}
