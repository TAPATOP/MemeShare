import { Component, OnInit } from '@angular/core';

import { MemeStorageService } from '../services/meme-storage.service';

type rawMeme = Array<{title, image}>; // ASK: Is this okay?

@Component({
  selector: 'app-meme-container',
  templateUrl: './meme-container.component.html',
  styleUrls: ['./meme-container.component.css'],
})
export class MemeContainerComponent implements OnInit {

  private memes: Meme[];

  constructor(
    private memeDataStorage: MemeStorageService
  ) { }

  ngOnInit() {
    this.memeDataStorage.domainUpdater.subscribe( () => {
      console.log('I\'m the container');
      this.memeDataStorage.getData().subscribe((response: rawMeme) => {
        this.memes = [];
        for (const meme of response) {
          this.memes.push(new Meme(meme.title, meme.image));
        }
      });
    });
  }
}

class Meme {
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
