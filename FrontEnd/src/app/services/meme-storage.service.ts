import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PageCounterService} from './page-counter.service';

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;
  private memePerPage = 6;
  private filterWord = '';

  @Output() sourceChangeEmitter = new EventEmitter();
  @Output() filterWordChangeEmitter = new EventEmitter();
  @Output() memePerPageChangeEmmitter = new EventEmitter();

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5ccffa323200009b4400f95d');
  }

  getData(pageNumber?: number) {
    if (pageNumber != null && pageNumber >= 0) {
      return this.getDataPaged(pageNumber);
    }
    return this.getDataPaged(1);
  }

  // private getDataNoParam() {
  //   let filterParam = this.filterParam();
  //   if (filterParam) {
  //     filterParam = filterParam.replace('&', '?');
  //   }
  //
  //   const getRequest = this.sourceURL + filterParam;
  //   console.log('Fetching this: ' + getRequest);
  //   return this.http.get(getRequest);
  // }

  private getDataPaged(pageNumber: number) {
    const memeIDLowBound = this.memePerPage * (pageNumber - 1);
    const memeIDHighBound = memeIDLowBound + this.memePerPage - 1;
    const getRequest =
      this.sourceURL +
      '?meme-low-bound=' + memeIDLowBound +
      '&meme-high-bound=' + memeIDHighBound +
      this.filterParam()
    ;
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest);
  }

  filterParam() {
    if (this.filterWord) {
      return '&filter-word=' + this.filterWord;
    }
    return '';
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

  setMemePerPage(num: number) {
    this.memePerPage = num;
  }

  setFilterWord(word: string) {
    this.filterWord = word;
    this.filterWordChangeEmitter.emit();
  }
}
