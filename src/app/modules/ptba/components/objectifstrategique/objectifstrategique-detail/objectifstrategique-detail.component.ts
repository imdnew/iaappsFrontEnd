import {Component, Type, OnInit} from '@angular/core';
import {AuthState} from './../../../../../states/auth/auth.state';
import {ObjectifstrategiqueState} from './../../../states/objectifstrategique.state';
import {Select, Store} from '@ngxs/store';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectifstrategiqueFormComponent} from '../objectifstrategique-form/objectifstrategique-form.component';
import {DeleteObjectifstrategique, SetFormTitle, ClearSelectedObjectifstrategique, SetLoading} from './../../../states/objectifstrategique.actions';
import {ActivatedRoute} from '@angular/router';
import {SetPageHead} from '../../../../../states/page-head/page-head.actions';
import {Objectifstrategique} from '../../../models/objectifstrategique';

@Component({
  selector: 'objectifstrategique-ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Suppresion</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Etes vous sure de vouloir supprimer l'élément <span class="text-primary">{{(objectifstrategique$|async).libelle | titlecase}}
        ({{(objectifstrategique$|async).code | uppercase}})</span> ?</strong></p>
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
export class NgbdObjectifstrategiqueModalConfirm {
  @Select(ObjectifstrategiqueState.selected) objectifstrategique$;
  objectId;

  constructor(public modal: NgbActiveModal, private store: Store) {
  }


   deleteByModal = () => {
     this.objectifstrategique$.subscribe((selected: Objectifstrategique) => {
       this.objectId = +selected.id;
      this.store.dispatch(new DeleteObjectifstrategique(+this.objectId));
      this.store.dispatch(new ClearSelectedObjectifstrategique());
      this.store.dispatch(new SetLoading());
    });
  };
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdObjectifstrategiqueModalConfirm
};

@Component({
  selector: 'app-objectifstrategique-detail',
  templateUrl: './objectifstrategique-detail.component.html',
  styleUrls: ['./objectifstrategique-detail.component.scss']
})
export class ObjectifstrategiqueDetailComponent implements OnInit {
  sub;
  objectId;
  @Select(ObjectifstrategiqueState.selected) objectifstrategique$;
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
    const modalRef = this.modalService.open(ObjectifstrategiqueFormComponent);

    return new SetFormTitle('Modifier Objectifstrategique');
  };

  @Dispatch()
  delete = (id) => {
    if (confirm('Etes vous sure de vouloir supprimer')) {
      return [new DeleteObjectifstrategique(id), new ClearSelectedObjectifstrategique(), new SetLoading()];
    } else {
      return new ClearSelectedObjectifstrategique();
    }
  };

  load = () => {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.objectId = +params.get('id');

      this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Objectifstrategique > edition'}));

    });

  };

  open(name: string) {
    this.modalService.open(MODALS[name]);
  }


}
