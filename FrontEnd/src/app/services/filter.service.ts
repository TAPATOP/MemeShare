import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterWord = '';
  @Output() filterTextChangeEmitter = new EventEmitter();

  constructor() { }

  setFilterWord(word: string) {
    this.filterWord = word;
    this.filterTextChangeEmitter.emit();
  }

  getFilter() {
    return this.filterWord;
  }
}
