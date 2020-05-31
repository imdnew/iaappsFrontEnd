import {Component, Type, OnInit} from '@angular/core';
import {AuthState} from './../../../../../states/auth/auth.state';
import {ObjectifspecifiqueState} from './../../../states/objectifspecifique.state';
import {Select, Store} from '@ngxs/store';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectifspecifiqueFormComponent} from '../objectifspecifique-form/objectifspecifique-form.component';
import {DeleteObjectifspecifique, SetFormTitle, ClearSelectedObjectifspecifique, SetLoading} from './../../../states/objectifspecifique.actions';
import {ActivatedRoute} from '@angular/router';
import {SetPageHead} from '../../../../../states/page-head/page-head.actions';
import {Objectifspecifique} from '../../../models/objectifspecifique';

@Component({
  selector: 'objectifspecifique-ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Suppresion</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Etes vous sure de vouloir supprimer l'élément <span class="text-primary">{{(objectifspecifique$|async).libelle | titlecase}}
        ({{(objectifspecifique$|async).code | uppercase}})</span> ?</strong></p>
      <p>Toutes les informations qui lui sont liées seront définitivement perdues.
        <span class="text-danger">Cette opération est irreversible.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Annuler</button>
      <button type="button" class="btn btn-danger" (click)="deleteByModal(); modal.close('Ok click')">Supprimer</button>
    </div>
  `
})
export class NgbdObjectifspecifiqueModalConfirm {
  @Select(ObjectifspecifiqueState.selected) objectifspecifique$;
  objectId;

  constructor(public modal: NgbActiveModal, private store: Store) {
  }


   deleteByModal = () => {
     this.objectifspecifique$.subscribe((selected: Objectifspecifique) => {
       this.objectId = +selected.id;
      this.store.dispatch(new DeleteObjectifspecifique(+this.objectId));
      this.store.dispatch(new ClearSelectedObjectifspecifique());
      this.store.dispatch(new SetLoading());
    });
  };
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdObjectifspecifiqueModalConfirm
};

@Component({
  selector: 'app-objectifspecifique-detail',
  templateUrl: './objectifspecifique-detail.component.html',
  styleUrls: ['./objectifspecifique-detail.component.scss']
})
export class ObjectifspecifiqueDetailComponent implements OnInit {
  sub;
  objectId;
  @Select(ObjectifspecifiqueState.selected) objectifspecifique$;
  @Select(AuthState.loggedOut) loggedOut$;

  constructor(
    private modalService: NgbModal, private route: ActivatedRoute, private store: Store
  ) {
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @Dispatch()
  edit = () => {
    const modalRef = this.modalService.open(ObjectifspecifiqueFormComponent);

    return new SetFormTitle('Modifier Objectifspecifique');
  };

  @Dispatch()
  delete = (id) => {
    if (confirm('Etes vous sure de vouloir supprimer')) {
      return [new DeleteObjectifspecifique(id), new ClearSelectedObjectifspecifique(), new SetLoading()];
    } else {
      return new ClearSelectedObjectifspecifique();
    }
  };

  load = () => {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.objectId = +params.get('id');

      this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifspecifique > edition'}));

    });

  };

  open(name: string) {
    this.modalService.open(MODALS[name]);
  }


}
