export class Meme {
  readonly id: string; // just json stuff(?)
  private title: string;
  private imageURL: string;

  constructor(id: string, title: string, imageURL: string) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
  }

  getTitle() {
    return this.title;
  }

  getImageURL() {
    return this.imageURL;
  }

  getID() {
    return this.id;
  }
}
