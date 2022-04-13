import {ContentModel} from "./ContentModel";

export class Project extends ContentModel {
  constructor(data) {
    super();
    const {
      title,
      startDate,
      endDate,
      description,
      grants,
      collaborators,
      photo,
    } = data || {};
    this.title = title || "";
    this.startDate = startDate || new Date().valueOf();
    this.endDate = endDate || new Date().valueOf();
    this.description = description || "";
    this.grants = grants || "";
    this.collaborators = collaborators || [];
    this.photo = photo || "";
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  set startDate(newDate) {
    this._startDate = newDate;
  }

  get startDate() {
    return this._startDate;
  }

  set endDate(newDate) {
    this._endDate = newDate;
  }

  get endDate() {
    return this._endDate;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get description() {
    return this._description;
  }

  set grants(newGrants) {
    this._grants = newGrants;
  }

  get grants() {
    return this._grants;
  }

  set photo(newPhoto) {
    this._photo = newPhoto;
  }

  get photo() {
    return this._photo;
  }

  set collaborators(newCollaborators) {
    this._collaborators = newCollaborators;
  }

  get collaborators() {
    return this._collaborators;
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
        size: 6,
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
        name: "startDate",
        value: this._startDate,
        size: 2,
        tag: {
          name: "date",
          props: {
            value: this._startDate,
            showYearPicker: true,
            dateFormat: "yyyy",
            showYear: true,
            views: ["year"],
            label: "Start Date",
          },
        },
      },
      {
        name: "endDate",
        value: this._endDate,
        size: 2,
        tag: {
          name: "date",
          props: {
            value: this._endDate,
            showYearPicker: true,
            dateFormat: "yyyy",
            showYear: true,
            views: ["year"],
            label: "End Date",
          },
        },
      },
      {
        name: "description",
        value: this._description,
        size: 12,
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._description,
            label: "Description",
            multiline: true,
          },
        },
      },
      {
        name: "grants",
        value: this._grants,
        size: 12,
        tag: {
          name: "text",
          props: {
            value: this._grants,
            fullWidth: true,
            label: "Supporting Grants",
            multiline: true,
          },
        },
      },
      {
        name: "collaborators",
        value: this._collaborators,
        size: 12,
        tag: {
          name: "collaborators",
          props: {
            value: this._collaborators,
            label: "Collaborators",
          },
        },
      },
      {
        name: "image",
        value: this._photo,
        size: 6,
        tag: {
          name: "img",
          props: {
            value: this._photo,
            label: "Image",
          },
        },
      },
    ];
  }
}
