import { Component, OnInit } from '@angular/core';
import { AuthState } from './../../../../states/auth/auth.state';
import { VmState } from './../../states/vm.state';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VmFormComponent } from '../vm-form/vm-form.component';
import { DeleteVm, SetFormTitle, ClearSelectedVm } from './../../states/vm.actions';

@Component({
  selector: 'app-vm-detail',
  templateUrl: './vm-detail.component.html',
  styleUrls: ['./vm-detail.component.scss']
})
export class VmDetailComponent implements OnInit {

  @Select(VmState.selected) vm$
  @Select(AuthState.loggedOut) loggedOut$

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  @Dispatch()
  edit = () => {
    const modalRef = this.modalService.open(VmFormComponent)

    return new SetFormTitle("Modifier Vm")
  }

  @Dispatch()
  delete = (id) => [new DeleteVm(id), new ClearSelectedVm()]


}
