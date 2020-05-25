import {Component, Type, OnInit} from '@angular/core';
import {AuthState} from './../../../../../states/auth/auth.state';
import {EntiteState} from './../../../states/entite.state';
import {Select, Store} from '@ngxs/store';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EntiteFormComponent} from '../entite-form/entite-form.component';
import {DeleteEntite, SetFormTitle, ClearSelectedEntite, SetLoading} from './../../../states/entite.actions';
import {ActivatedRoute} from '@angular/router';
import {SetPageHead} from '../../../../../states/page-head/page-head.actions';
import {Entite} from '../../../models/entite';

@Component({
  selector: 'cngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Suppresion</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Etes vous sure de vouloir supprimer l'élément <span class="text-primary">{{(entite$|async).nom | titlecase}}
        ({{(entite$|async).sigle | uppercase}})</span> ?</strong></p>
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
export class NgbdEntiteModalConfirm {
  @Select(EntiteState.selected) entite$;
  objectId;

  constructor(public modal: NgbActiveModal, private store: Store) {
  }


   deleteByModal = () => {
     this.entite$.subscribe((selected: Entite) => {
       this.objectId = +selected.id;
      this.store.dispatch(new DeleteEntite(+this.objectId));
      this.store.dispatch(new ClearSelectedEntite());
      this.store.dispatch(new SetLoading());
    });
  };
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdEntiteModalConfirm
};

@Component({
  selector: 'app-entite-detail',
  templateUrl: './entite-detail.component.html',
  styleUrls: ['./entite-detail.component.scss']
})
export class EntiteDetailComponent implements OnInit {
  sub;
  objectId;
  @Select(EntiteState.selected) entite$;
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
    const modalRef = this.modalService.open(EntiteFormComponent);

    return new SetFormTitle('Modifier Entite');
  };

  @Dispatch()
  delete = (id) => {
    if (confirm('Etes vous sure de vouloir supprimer')) {
      return [new DeleteEntite(id), new ClearSelectedEntite(), new SetLoading()];
    } else {
      return new ClearSelectedEntite();
    }
  };

  load = () => {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.objectId = +params.get('id');

      this.store.dispatch(new SetPageHead({title: 'PTBA', description: 'Entite > edition'}));

    });

  };

  open(name: string) {
    this.modalService.open(MODALS[name]);
  }


}
