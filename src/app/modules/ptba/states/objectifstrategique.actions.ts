import { Objectifstrategique } from './../models/objectifstrategique';

export class SetFormTitle {
  static readonly type = '[Objectifstrategique] SetFormTitle';
  constructor(public payload: string) { }
}

export class SetLoading {
  static readonly type = '[Objectifstrategique] SetLoading';
  constructor() { }
}

export class SetLoaded<T> {
  static readonly type = '[Objectifstrategique] SetLoaded';
  constructor(public payload: T) { }
}

export class AddObjectifstrategique {
  static readonly type = '[Objectifstrategique] AddObjectifstrategique';
  constructor(public payload: Objectifstrategique) { }
}

export class UpsertObjectifstrategique {
  static readonly type = '[Objectifstrategique] UpsertObjectifstrategique';
  constructor(public payload: Objectifstrategique) { }
}

export class FilterObjectifstrategiques {
  static readonly type = '[Objectifstrategique] FilterObjectifstrategiques';
  constructor(public payload: string) { }
}

export class GetObjectifstrategiques {
  static readonly type = '[Objectifstrategique] GetObjectifstrategiques All';
  constructor() { }
}

export class SelectObjectifstrategique {
  static readonly type = '[Objectifstrategique] SelectObjectifstrategique';
  constructor(public payload: Objectifstrategique) { }
}

export class ClearSelectedObjectifstrategique {
  static readonly type = '[Objectifstrategique] ClearSelectedObjectifstrategique';
  constructor() { }
}

export class EditObjectifstrategique {
  static readonly type = '[Objectifstrategique] EditObjectifstrategique';
  constructor(public payload: Objectifstrategique) { }
}

export class DeleteObjectifstrategique {
  static readonly type = '[Objectifstrategique] DeleteObjectifstrategique';
  constructor(public payload: number) { }
}

