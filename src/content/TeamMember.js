import { ContentModel } from "./ContentModel";

export class TeamMember extends ContentModel {
  constructor(data) {
    super();
    const { name, institute, description, photo } = data || {};
    this.name = name || "";
    this.institute = institute || "";
    this.description = description || "";
    this.photo = photo || "";
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  set institute(newInstitute) {
    this._institute = newInstitute;
  }

  get institute() {
    return this._institute;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get description() {
    return this._description;
  }

  set photo(newPhoto) {
    this._photo = newPhoto;
  }

  get photo() {
    return this._photo;
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
        name: "name",
        value: this._name,
        size: 5,
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
        name: "institute",
        value: this._institute,
        size: 5,
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._institute,
            label: "Institute",
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
        name: "photo",
        value: this._photo,
        size: 12,
        tag: {
          name: "img",
          props: {
            alt: this._name,
            src: this._photo,
            label: "Image",
          },
        },
      },
    ];
  }
}
