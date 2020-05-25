import { Component, OnInit } from '@angular/core';
import { UpsertVm } from './../../states/vm.actions';
import { Vm } from './../../models/vm';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VmState } from './../../states/vm.state';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbActiveModal,   NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vm-form',
  templateUrl: './vm-form.component.html',
  styleUrls: ['./vm-form.component.scss']
})
export class VmFormComponent implements OnInit {

  @Select(VmState.formTitle) formTitle$;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', Validators.required),
    adresseip: new FormControl('', Validators.required),
    adresseipnum: new FormControl(''),
    groupe: new FormControl(''),
    ports: new FormControl(''),
    description: new FormControl(''),
    structure: new FormControl(''),
    os: new FormControl(''),
    projet: new FormControl(''),
    datecreation: new FormControl('')
  })
  edit$: Observable<any>;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store
  ) { }

  ngOnInit() {
    this.form.disable()
    this.edit$ = this.store.selectOnce(VmState.selected).pipe(
      tap(vm => {
        if (vm)
          this.form.patchValue(vm)
        this.form.enable()
      })
    )
  }

  dismiss() {
    this.activeModal.dismiss()
  }

  get disabled() {
    return this.form.disabled || this.form.invalid
  }

  @Dispatch()
  save = () => {
    this.activeModal.dismiss();
    this.form.controls['adresseipnum'].setValue(((this.form.controls['adresseip'].value).split('.')).join(''));
    this.form.controls['nom'].setValue(((this.form.controls['nom'].value).toLowerCase()));
    this.form.controls['projet'].setValue(((this.form.controls['projet'].value).toLowerCase()));
   // this.store.dispatch(new SelectVm(this.form.value));    
    return new UpsertVm(this.form.value);
    
  }

}
