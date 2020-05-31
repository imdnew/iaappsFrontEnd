import { Objectifspecifique } from './../models/objectifspecifique';

export class SetFormTitle {
  static readonly type = '[Objectifspecifique] SetFormTitle';
  constructor(public payload: string) { }
}

export class SetLoading {
  static readonly type = '[Objectifspecifique] SetLoading';
  constructor() { }
}

export class SetLoaded<T> {
  static readonly type = '[Objectifspecifique] SetLoaded';
  constructor(public payload: T) { }
}

export class AddObjectifspecifique {
  static readonly type = '[Objectifspecifique] AddObjectifspecifique';
  constructor(public payload: Objectifspecifique) { }
}

export class UpsertObjectifspecifique {
  static readonly type = '[Objectifspecifique] UpsertObjectifspecifique';
  constructor(public payload: Objectifspecifique) { }
}

export class FilterObjectifspecifiques {
  static readonly type = '[Objectifspecifique] FilterObjectifspecifiques';
  constructor(public payload: string) { }
}

export class GetObjectifspecifiques {
  static readonly type = '[Objectifspecifique] GetObjectifspecifiques All';
  constructor() { }
}

export class SelectObjectifspecifique {
  static readonly type = '[Objectifspecifique] SelectObjectifspecifique';
  constructor(public payload: Objectifspecifique) { }
}

export class ClearSelectedObjectifspecifique {
  static readonly type = '[Objectifspecifique] ClearSelectedObjectifspecifique';
  constructor() { }
}

export class EditObjectifspecifique {
  static readonly type = '[Objectifspecifique] EditObjectifspecifique';
  constructor(public payload: Objectifspecifique) { }
}

export class DeleteObjectifspecifique {
  static readonly type = '[Objectifspecifique] DeleteObjectifspecifique';
  constructor(public payload: number) { }
}

