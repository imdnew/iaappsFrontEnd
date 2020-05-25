import { Component, OnInit } from '@angular/core';
import { SetFormTitle, ClearSelectedVm, FilterVms } from './../../states/vm.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VmFormComponent } from '../../components/vm-form/vm-form.component';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { AuthState } from './../../../../states/auth/auth.state';

import { Select } from '@ngxs/store';
import { VmState } from './../../states/vm.state';



@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss']
})
export class VmsComponent implements OnInit {
  @Select(VmState.loading) loading$
  @Select(AuthState.loggedOut) loggedOut$
  constructor(
    private modalService: NgbModal,
    private store: Store
  ) { }

  ngOnInit() {
    // this.store.dispatch(new FilterVms(''))
  }

  @Dispatch()
  openModal = () => {
    const modalRef = this.modalService.open(VmFormComponent, { backdrop: 'static', size: 'sm'})
    return [new SetFormTitle("Ajouter Vm"), new ClearSelectedVm()]
  }

}
