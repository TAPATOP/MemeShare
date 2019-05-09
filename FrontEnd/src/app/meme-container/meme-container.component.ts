import { Component, OnInit } from '@angular/core';

import { MemeStorageService } from '../services/meme-storage.service';
import { PageCounterService } from '../services/page-counter.service';
import { Meme } from '../classes/Meme';

@Component({
  selector: 'app-meme-container',
  templateUrl: './meme-container.component.html',
  styleUrls: ['./meme-container.component.css'],
})
export class MemeContainerComponent implements OnInit {

  private memesForDisplay: Meme[];

  constructor(
    private memeStorageService: MemeStorageService,
    private pageCounterService: PageCounterService
  ) { }

  ngOnInit() {
    this.memeStorageService.loadedMemesEmitter.subscribe( () => {
      this.updateMemes();
      console.log('wwwwww2 ');
    });
    this.pageCounterService.changedPageEmitter.subscribe(() => {
      this.updateMemes();
      console.log('wwwwww ');
    });
  }

  updateMemes() {
    this.memesForDisplay = this.getMemesForDisplay('');
  }

  getMemesForDisplay(filter: string) {
    const lowerMemeIDBound = (this.pageCounterService.getCurrentPage() - 1) * this.memeStorageService.getMemePerPage();
    const highMemeIDBound = lowerMemeIDBound + this.memeStorageService.getMemePerPage();

    const filteredMemes: Meme[] = this.filterMemes(this.memeStorageService.getMemes(), filter.toLowerCase(), highMemeIDBound);
    return filteredMemes.slice(lowerMemeIDBound, highMemeIDBound);
  }

  filterMemes(memes: Meme[], filter: string, sizeForStop: number) {
    const filteredMemes: Meme[] = [];
    for (const meme of memes) {
      if (filteredMemes.length > sizeForStop) {
        break;
      }
      if (this.matchesFilter(meme, filter)) {
        filteredMemes.push(meme);
      }
    }
    return filteredMemes;
  }

  matchesFilter(meme: Meme, filter: string) {
    if (null === filter || '' === filter) {
      return true;
    }
    return meme.getTitle().toLowerCase().includes(filter);
  }
}
