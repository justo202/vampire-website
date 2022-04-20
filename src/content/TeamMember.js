import {ContentModel} from "./ContentModel";

export class TeamMember extends ContentModel {
  constructor(data) {
    super();
    const {name, institute, description, hasImage} = data || {};
    this.name = name || "";
    this.institute = institute || "";
    this.description = description || "";
    this.hasImage = hasImage || "";
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

  set hasImage(newPhoto) {
    this._hasImage = newPhoto;
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
        name: "name",
        value: this._name,
        size: {
          mobile: 12,
          desktop: 5,
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
        name: "institute",
        value: this._institute,
        size: {
          mobile: 12,
          desktop: 5,
        },
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
        size: {
          mobile: 12,
          desktop: 12,
        },
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
        name: "hasImage",
        value: this._hasImage,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "img",
          props: {
            alt: this._name,
            src: this._hasImage,
            label: "Image",
          },
        },
      },
    ];
  }
}
