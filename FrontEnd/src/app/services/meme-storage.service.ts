import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PageCounterService} from './page-counter.service';
import {Meme} from '../classes/Meme';

type rawMeme = Array<{title, image}>;

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;
  private memes: Meme[];

  @Output() loadedMemesEmitter = new EventEmitter();
  @Output() filterWordChangeEmitter = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getAllData() {
    const getRequest = this.sourceURL;
      // this.sourceURL + this.filterParam().replace('&', '?');
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest).subscribe((response: rawMeme) => {
      this.memes = [];
      for (const meme of response) {
        this.memes.push(new Meme(meme.title, meme.image));
      }
      this.loadedMemesEmitter.emit();
    });
  }

  getMemes() {
    return this.memes;
  }

  // filterParam() {
  //   if (this.filterWord) {
  //     return '&filter-word=' + this.filterWord;
  //   }
  //   return '';
  // }

  setSource(newURL: string) {
    this.sourceURL = newURL;
    this.getAllData();
  }

  getNumberOfMemes() {
    return this.memes.length;
  }
}
