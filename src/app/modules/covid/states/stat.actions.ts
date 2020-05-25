import { Stat } from './../models/stat';

export class SetFormTitle {
  static readonly type = '[Stat] SetFormTitle';
  constructor(public payload: string) { }
}

export class SetLoading {
  static readonly type = '[Stat] SetLoading';
  constructor() { }
}

export class SetLoaded<T>{
  static readonly type = '[Stat] SetLoaded';
  constructor(public payload: T) { }
}

export class AddStat {
  static readonly type = '[Stat] AddStat';
  constructor(public payload: Stat) { }
}

export class UpsertStat {
  static readonly type = '[Stat] UpsertStat';
  constructor(public payload: Stat) { }
}

export class FilterStats {
  static readonly type = '[Stat] FilterStats';
  constructor(public payload: string) { }
}

export class SelectStat {
  static readonly type = '[Stat] SelectStat';
  constructor(public payload: Stat) { }
}

export class ClearSelectedStat {
  static readonly type = '[Stat] ClearSelectedStat';
  constructor() { }
}

export class EditStat {
  static readonly type = '[Stat] EditStat';
  constructor(public payload: Stat) { }
}

export class DeleteStat {
  static readonly type = '[Stat] DeleteStat';
  constructor(public payload: number) { }
}

