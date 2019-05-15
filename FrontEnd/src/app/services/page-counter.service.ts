import {EventEmitter, Injectable, Output} from '@angular/core';
import {MemeStorageService} from './meme-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageCounterService {
  private currentPage = 1;
  private memesPerPage = 3;
  private maxPages = 0;

  @Output() changedPageEmitter = new EventEmitter();
  @Output() memePerPageChangeEmitter = new EventEmitter();

  constructor(private memeService: MemeStorageService) {
    this.memePerPageChangeEmitter.subscribe(() => {
      this.reset();
    });
    memeService.loadedMemesEmitter.subscribe(() => {
      this.reset();
    });
    memeService.memeDeletedEmitter.subscribe(() => {
      this.calculateMaxPages();
      console.log('new max pages: ' + this.maxPages);
    });
  }

  reset() {
    this.calculateMaxPages();
    this.setPage(1);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setPage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPages) {
      return;
    }

    if (newPage > this.maxPages) {
      this.currentPage = this.maxPages;
    } else {
      this.currentPage = newPage;
    }

    this.changedPageEmitter.emit(this.currentPage);
  }

  incrementPage() {
    this.setPage(this.currentPage + 1);
  }

  decrementPage() {
    this.setPage(this.currentPage - 1);
  }

  calculateMaxPages() {
    this.maxPages = Math.floor(this.memeService.getNumberOfMemes() / this.memesPerPage);
    if (this.maxPages * this.memesPerPage !== this.memeService.getNumberOfMemes()) {
      this.maxPages++;
    }
  }

  getMemesPerPage() {
    return this.memesPerPage;
  }

  setMemesPerPage(num: number) {
    if (num < 0) {
      return;
    }

    this.memesPerPage = num;
    this.memePerPageChangeEmitter.emit();
  }

  getMaxPages() {
    return this.maxPages;
  }
}
