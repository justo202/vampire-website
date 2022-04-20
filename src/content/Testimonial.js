import {ContentModel} from "./ContentModel";

export class Testimonial extends ContentModel {
  constructor(data) {
    super();
    const {name, text} = data || {};
    this.name = name || "";
    this.text = text || "";
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  set text(newText) {
    this._text = newText;
  }

  get text() {
    return this._text;
  }

  getAttributes() {
    return [
      {
        name: "id",
        value: this._id,
        size: {
          mobile: 12,
          desktop: 2,
        },
        tag: {
          name: "text",
          props: {
            disabled: true,
            fullWidth: true,
            label: "ID",
            value: this._id,
          },
        },
      },
      {
        name: "name",
        value: this._name,
        size: {
          mobile: 12,
          desktop: 10,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._name,
            label: "Name",
          },
        },
      },
      {
        name: "text",
        value: this._text,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._text,
            label: "Text",
            multiline: true,
          },
        },
      },
    ];
  }
}
