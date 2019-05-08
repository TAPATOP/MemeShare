import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageCounterService {

  private memePerPage = 6;
  private currentPage = 1;
  private maxPages = 0;

  constructor() { }

  getMemePerPage() {
    return this.memePerPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setPage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPages) {
      return;
    }

    this.currentPage = newPage;
  }

  incrementPage() {
    this.setPage(this.currentPage + 1);
  }

  decrementPage() {
    this.setPage(this.currentPage - 1);
  }
}
