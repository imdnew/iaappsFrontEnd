import { Vm } from './../models/vm';

export class SetFormTitle {
  static readonly type = '[Vm] SetFormTitle';
  constructor(public payload: string) { }
}

export class SetLoading {
  static readonly type = '[Vm] SetLoading';
  constructor() { }
}

export class SetLoaded<T>{
  static readonly type = '[Vm] SetLoaded';
  constructor(public payload: T) { }
}

export class AddVm {
  static readonly type = '[Vm] AddVm';
  constructor(public payload: Vm) { }
}

export class UpsertVm {
  static readonly type = '[Vm] UpsertVm';
  constructor(public payload: Vm) { }
}

export class FilterVms {
  static readonly type = '[Vm] FilterVms';
  constructor(public payload: string) { }
}

export class SelectVm {
  static readonly type = '[Vm] SelectVm';
  constructor(public payload: Vm) { }
}

export class ClearSelectedVm {
  static readonly type = '[Vm] ClearSelectedVm';
  constructor() { }
}

export class EditVm {
  static readonly type = '[Vm] EditVm';
  constructor(public payload: Vm) { }
}

export class DeleteVm {
  static readonly type = '[Vm] DeleteVm';
  constructor(public payload: string) { }
}

