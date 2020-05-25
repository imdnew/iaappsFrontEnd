import { FirestoreService } from './../../../services/firestore.service';
import { Vm } from './../models/vm';
import {SortDirection} from './../../../directives/sortable.directive';
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
/* 
import {COUNTRIES} from './countries';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
interface SearchResult {
  vms: Vm[];
  total: number;
} 

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(vms: Vm[], column: string, direction: string): Vm[] {
  if (direction === '') {
    return vms;
  } else {
    return [...vms].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(vm: Vm, term: string, pipe: PipeTransform) {
  return vm.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(vm.area).includes(term)
    || pipe.transform(vm.population).includes(term);
}
*/

@Injectable({
  providedIn: 'root'
})
export class VmFirestore extends FirestoreService<Vm> {

  protected basePath: string = 'Vms';

}
