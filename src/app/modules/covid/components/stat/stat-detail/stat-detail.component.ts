import { Component, OnInit } from '@angular/core';
import { AuthState } from './../../../../../states/auth/auth.state';
import { StatState } from './../../../states/stat.state';
import {Select, Store} from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatFormComponent } from '../stat-form/stat-form.component';
import { DeleteStat, SetFormTitle, ClearSelectedStat, SetLoading } from './../../../states/stat.actions';
import { ActivatedRoute } from '@angular/router';
import {SetPageHead} from '../../../../../states/page-head/page-head.actions';

@Component({
  selector: 'app-stat-detail',
  templateUrl: './stat-detail.component.html',
  styleUrls: ['./stat-detail.component.scss']
})
export class StatDetailComponent implements OnInit {
  sub;
  @Select(StatState.selected) stat$;
  @Select(AuthState.loggedOut) loggedOut$;

  constructor(
    private modalService: NgbModal, private route: ActivatedRoute, private store: Store
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Dispatch()
  edit = () => {
    const modalRef = this.modalService.open(StatFormComponent);

    return new SetFormTitle("Modifier Stat");
  }

  @Dispatch()
  delete = (id) => [new DeleteStat(id), new ClearSelectedStat(), new SetLoading()]

  load = () => {
    this.sub = this.route.paramMap.subscribe((params) => {
      const objectId = +params.get('id');
    });

}
}
