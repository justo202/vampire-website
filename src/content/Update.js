import {Timestamp} from "firebase/firestore";
import {ContentModel} from "./ContentModel";

export class Update extends ContentModel {
  constructor(data) {
    super();
    const {title, text, date, photos} = data || {};
    this.title = title || "";
    this.text = text || "";
    this.date = (date && date.toMillis()) || new Timestamp().nanoseconds;
    this.photos = photos || [];
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

  set photos(newPhotos) {
    this._photos = newPhotos;
  }

  get photos() {
    return this._photos;
  }

  getState() {
    return {
      id: this._id,
      title: this._title,
      date: this._date,
      text: this._text,
      photos: this._photos,
    };
  }

  getAttributes() {
    return [
      {
        name: "id",
        value: this._id,
        size: 2,
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
        size: 7,
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
        size: 3,
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
        size: 12,
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
        name: "photos",
        value: this._photos,
        size: 12,
        tag: {
          name: "img",
          props: {
            value: this._photos,
            label: "Image(s)",
          },
        },
      },
    ];
  }
}
