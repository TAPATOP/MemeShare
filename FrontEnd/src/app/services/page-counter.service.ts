import {EventEmitter, Injectable, Output} from '@angular/core';
import {MemeStorageService} from './meme-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageCounterService {
  private currentPage = 1;
  private maxPages = 0;
  private isActive: boolean;

  @Output() isActiveChangeEmitter = new EventEmitter();

  constructor(private memeService: MemeStorageService) { }

  getCurrentPage() {
    return this.currentPage;
  }

  setPage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPages) {
      return;
    }

    this.currentPage = newPage;
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

  setMaxPages() {
    this.maxPages = this.memeService.getCountOfAllMemes() / this.memeService.getMemePerPage();
    if (this.maxPages * this.memeService.getMemePerPage() !== this.memeService.getCountOfAllMemes()) {
      this.maxPages++;
    }
  }
}
