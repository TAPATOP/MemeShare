import { Component, OnInit } from '@angular/core';

import { MemeStorageService } from '../services/meme-storage.service';
import {PageCounterService} from '../services/page-counter.service';

type rawMeme = Array<{title, image}>;

@Component({
  selector: 'app-meme-container',
  templateUrl: './meme-container.component.html',
  styleUrls: ['./meme-container.component.css'],
})
export class MemeContainerComponent implements OnInit {

  private memes: Meme[];

  constructor(
    private memeStorageService: MemeStorageService,
    private pageCounterService: PageCounterService
  ) { }

  ngOnInit() {
    this.memeStorageService.sourceChangeEmitter.subscribe( () => {
      this.updateMemes();
    });
  }

  updateMemes() {
    this.memeStorageService.getData().subscribe((response: rawMeme) => {
      this.memes = [];
      for (const meme of response) {
        this.memes.push(new Meme(meme.title, meme.image));
      }
    });
  }

  setMaxPages() {
    let maxPages = this.memeStorageService.getCountOfAllMemes() / this.pageCounterService.getMemePerPage();
    if (maxPages * this.pageCounterService.getMemePerPage() !== this.memeStorageService.getCountOfAllMemes()) {
      maxPages++;
    }
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
