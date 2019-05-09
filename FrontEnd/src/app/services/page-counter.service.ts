import {EventEmitter, Injectable, Output} from '@angular/core';
import {MemeStorageService} from './meme-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageCounterService {
  private currentPage = 1;
  private memesPerPage = 3;
  private maxPages = 0;
  private isActive: boolean;

  @Output() isActiveChangeEmitter = new EventEmitter();
  @Output() changedPageEmitter = new EventEmitter();

  constructor(private memeService: MemeStorageService) {
    memeService.memePerPageChangeEmitter.subscribe(() => {
      this.calculateNumberOfPages();
      this.setPage(1);
    });
    memeService.loadedMemesEmitter.subscribe(() => {
      this.calculateNumberOfPages();
      this.setPage(1);
    });
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

  setStatus(isActive: boolean) {
    this.isActive = isActive;
    this.isActiveChangeEmitter.emit();
  }

  incrementPage() {
    this.setPage(this.currentPage + 1);
  }

  decrementPage() {
    this.setPage(this.currentPage - 1);
  }

  calculateNumberOfPages() {
    this.maxPages = Math.floor(this.memeService.getNumberOfMemes() / this.memesPerPage);
    if (this.maxPages * this.memesPerPage !== this.memeService.getNumberOfMemes()) {
      this.maxPages++;
    }
  }

  getMemesPerPage() {
    return this.memesPerPage;
  }
}
