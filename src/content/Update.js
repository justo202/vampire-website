import {ContentModel} from "./ContentModel";

export class Update extends ContentModel {
  constructor(data) {
    super();
    const {title, text, date, hasImage} = data || {};
    this.title = title || "";
    this.text = text || "";
    this.date = date ? date.valueOf() : new Date().valueOf();
    this.hasImage = hasImage || "";
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  set text(newText) {
    this._text = newText;
  }

  get text() {
    return this._text;
  }

  set date(newDate) {
    this._date = newDate;
  }

  get date() {
    return this._date;
  }

  set hasImage(newPhotos) {
    this._hasImage = newPhotos;
  }

  get hasImage() {
    return this._hasImage;
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
        name: "title",
        value: this._title,
        size: {
          mobile: 12,
          desktop: 7,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._title,
            label: "Title",
          },
        },
      },
      {
        name: "date",
        value: this._date,
        size: {
          mobile: 12,
          desktop: 3,
        },
        tag: {
          name: "date",
          props: {
            fullWidth: true,
            value: this._date,
            label: "Date",
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
      {
        name: "hasImage",
        value: this._hasImage,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "img",
          props: {
            value: this._hasImage,
            label: "Image",
          },
        },
      },
    ];
  }
}
