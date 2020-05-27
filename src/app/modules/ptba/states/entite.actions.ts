import { Entite } from './../models/entite';

export class SetFormTitle {
  static readonly type = '[Entite] SetFormTitle';
  constructor(public payload: string) { }
}

export class SetLoading {
  static readonly type = '[Entite] SetLoading';
  constructor() { }
}

export class SetLoaded<T> {
  static readonly type = '[Entite] SetLoaded';
  constructor(public payload: T) { }
}

export class AddEntite {
  static readonly type = '[Entite] AddEntite';
  constructor(public payload: Entite) { }
}

export class UpsertEntite {
  static readonly type = '[Entite] UpsertEntite';
  constructor(public payload: Entite) { }
}

export class FilterEntites {
  static readonly type = '[Entite] FilterEntites';
  constructor(public payload: string) { }
}

export class GetEntites {
  static readonly type = '[Entite] GetEntites All';
  constructor() { }
}

export class SelectEntite {
  static readonly type = '[Entite] SelectEntite';
  constructor(public payload: Entite) { }
}

export class ClearSelectedEntite {
  static readonly type = '[Entite] ClearSelectedEntite';
  constructor() { }
}

export class EditEntite {
  static readonly type = '[Entite] EditEntite';
  constructor(public payload: Entite) { }
}

export class DeleteEntite {
  static readonly type = '[Entite] DeleteEntite';
  constructor(public payload: number) { }
}

