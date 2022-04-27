import {ContentModel} from "./ContentModel";

export class Publication extends ContentModel {
  constructor(data) {
    super();
    const {
      title,
      booktitle,
      fulljournalname,
      date,
      publisher,
      publishername,
      authors,
      number,
      volume,
      pages,
      doctype,
      category,
      citation,
      doi,
    } = data || {};
    this.title = title || "";
    this.booktitle = booktitle || fulljournalname || "";
    this.date = date || new Date().valueOf();
    this.publisher = publisher || publishername || "";
    this.authors = this.parseAuthors(authors) || [];
    this.number = number || "";
    this.volume = volume || "";
    this.pages = pages || "";
    this.doctype = doctype || "";
    this.category = category || "";
    this.citation = citation || "";
    this.doi = doi || "";
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  set category(newTitle) {
    this._category = newTitle;
  }

  get category() {
    return this._category;
  }

  set booktitle(newBooktitle) {
    this._booktitle = newBooktitle;
  }

  get booktitle() {
    return this._booktitle;
  }

  set date(newDate) {
    this._date = newDate;
  }

  get date() {
    return this._date;
  }

  set authors(newAuthors) {
    this._authors = newAuthors;
  }

  get authors() {
    return this._authors;
  }

  set volume(newAuthors) {
    this._volume = newAuthors;
  }

  get volume() {
    return this._volume;
  }

  set number(newAuthors) {
    this._number = newAuthors;
  }

  get number() {
    return this._number;
  }

  set publisher(newPublishers) {
    this._publisher = newPublishers;
  }

  get publisher() {
    return this._publisher;
  }

  set pages(newAuthors) {
    this._pages = newAuthors;
  }

  get pages() {
    return this._pages;
  }

  set doi(newAuthors) {
    this._doi = newAuthors;
  }

  get doi() {
    return this._doi;
  }

  set citation(newCitation) {
    this._citation = newCitation;
  }

  get citation() {
    return this.citation;
  }

  parseAuthors(newAuthors) {
    if (!newAuthors) return [];
    if (newAuthors.hasOwnProperty("authors")) {
      return newAuthors.authors.map(
        (author) => author.name || author.full_name
      );
    } else {
      return newAuthors;
    }
  }

  generateCitation() {
    let authorsText = "";
    if (this._authors.length === 0) {
      authorsText = "";
    }
    if (this._authors.length === 1) {
      authorsText = this.authors[0] + " ";
    } else if (this._authors.length > 1) {
      authorsText = `${this._authors
        .slice(0, this._authors.length - 1)
        .map((author, idx) => (idx > 0 ? " " + author : author))} and ${
        this._authors[this._authors.length - 1]
      } `;
    }

    return `${authorsText}(${new Date(this._date).getFullYear()}), "${
      this._title
    }"${this._booktitle ? `, ${this._booktitle}` : ""}${
      this._volume ? `, Vol. ${this._volume}` : ""
    }${this._number ? `, No. ${this._number}` : ""}${
      this._pages ? `, pp. ${this._pages}` : ""
    }${this._publisher ? `, ${this._publisher}` : ""}`;
  }

  getDate(data) {
    switch (data) {
      case data.sortpubdate:
        return new Date(data.sortpubdate).valueOf();
      case data.publication_date:
        return new Date(data.publication_date).valueOf();
      case data.pubdate:
        return new Date(data.pubdate).valueOf();
      case data.epubdate:
        return new Date(data.epubdate).valueOf();
      case data.history[0].date:
        return new Date(data.history[0].date).valueOf();
      default:
        return new Date().valueOf();
    }
  }

  updateAuthors(newAuthors) {
    this._authors = newAuthors;
    return this._authors;
  }

  getAttributes() {
    return [
      {
        name: "id",
        value: this._id,
        size: {
          mobile: 4,
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
        name: "doi",
        value: this._doi,
        size: {
          mobile: 8,
          desktop: 2,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            label: "DOI",
            value: this._doi,
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
            label: "Publish Date",
            views: ["month", "year"],
          },
        },
      },
      {
        name: "publisher",
        value: this._publisher,
        size: {
          mobile: 12,
          desktop: 5,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._publisher,
            label: "Publisher",
          },
        },
      },
      {
        name: "booktitle",
        value: this._booktitle,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._booktitle,
            label: "Book Title or Journal Name or Conference",
            multiline: true,
          },
        },
      },
      {
        name: "title",
        value: this._title,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._title,
            label: "Title",
            multiline: true,
          },
        },
      },
      {
        name: "category",
        value: this._category,
        size: {
          mobile: 12,
          desktop: 3,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._category,
            label: "Category",
            multiline: true,
          },
        },
      },
      {
        name: "volume",
        value: this._volume,
        size: {
          mobile: 12,
          desktop: 3,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._volume,
            label: "Volume",
            multiline: true,
          },
        },
      },
      {
        name: "number",
        value: this._number,
        size: {
          mobile: 12,
          desktop: 3,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._number,
            label: "Number",
            multiline: true,
          },
        },
      },
      {
        name: "pages",
        value: this._pages,
        size: {
          mobile: 12,
          desktop: 3,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            value: this._pages,
            label: "Pages",
            multiline: true,
          },
        },
      },
      {
        name: "authors",
        value: this._authors,
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "authors",
          props: {
            fullWidth: true,
            value: this._authors,
            label: "Authors",
          },
        },
      },
      {
        name: "citation",
        value: this._citation ? this._citation : this.generateCitation(),
        size: {
          mobile: 12,
          desktop: 12,
        },
        tag: {
          name: "text",
          props: {
            fullWidth: true,
            multiline: true,
            value: this._citation ? this._citation : this.generateCitation(),
            label: "Full Publication Citation",
            spellCheck: false,
            helperText:
              "If you would like to overwrite the current citation, please edit this textbox",
          },
        },
      },
    ];
  }
}
