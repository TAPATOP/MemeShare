import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PageCounterService} from './page-counter.service';

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;
  private memePerPage = 6;
  private searchWord: string;

  @Output() sourceChangeEmitter = new EventEmitter();

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5ccffa323200009b4400f95d');
  }

  getData(pageNumber?: number) {
    if (pageNumber != null || pageNumber >= 0) {
      return this.getDataPaged(pageNumber);
    }
    return this.getDataNoParam();
  }

  getDataNoParam() {
    const getRequest = this.sourceURL;
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest);
  }

  getDataPaged(pageNumber: number) {
    const memeIDLowBound = this.memePerPage * (pageNumber - 1);
    const memeIDHighBound = memeIDLowBound + this.memePerPage - 1;
    const getRequest =
      this.sourceURL +
      '?meme-low-bound=' + memeIDLowBound +
      '&meme-high-bound=' + memeIDHighBound
    ;
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest);
  }

  // ASK: subscribe to this or just return number?
  getCountOfAllMemes() {
    return 60;
    // return this.http.get(this.sourceURL + '/meme-count');
  }

  setSource(newURL: string) {
    this.sourceURL = newURL;
    this.sourceChangeEmitter.emit();
  }

  getMemePerPage() {
    return this.memePerPage;
  }
}
