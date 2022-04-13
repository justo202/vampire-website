export class ContentModel {
  constructor() {
    this.id = "";
  }

  set id(newId) {
    this._id = newId;
  }

  get id() {
    return this._id;
  }
}
