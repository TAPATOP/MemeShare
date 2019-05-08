export class Meme {
  private title: string;
  private imageURL: string;

  constructor(title: string, imageURL: string) {
    this.title = title;
    this.imageURL = imageURL;
  }

  getTitle() {
    return this.title;
  }

  getImageURL() {
    return this.imageURL;
  }
}
