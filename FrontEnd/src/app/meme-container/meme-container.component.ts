import {Component, OnInit} from '@angular/core';

import {MemeStorageService} from '../services/meme-storage.service';
import {PageCounterService} from '../services/page-counter.service';
import {Meme} from '../classes/Meme';
import {FilterComponent} from '../filter/filter.component';
import {FilterService} from '../services/filter.service';
import {ItskoResponse, Status} from '../classes/ItskoResponse';
import {MemeSubmitterService} from '../services/meme-submitter.service';

@Component({
  selector: 'app-meme-container',
  templateUrl: './meme-container.component.html',
  styleUrls: ['./meme-container.component.css'],
  providers: [FilterComponent]
})
export class MemeContainerComponent implements OnInit {
  memesForDisplay: Meme[];

  constructor(
    private memeStorageService: MemeStorageService,
    private pageCounterService: PageCounterService,
    private filterComponent: FilterComponent,
    private filterService: FilterService,
    private submitterService: MemeSubmitterService
  ) { }

  ngOnInit() {
    this.memeStorageService.loadedMemesEmitter.subscribe( () => {
      this.updateMemes();
    });
    this.pageCounterService.changedPageEmitter.subscribe(() => {
      this.updateMemes();
    });
    this.pageCounterService.memePerPageChangeEmitter.subscribe(() => {
      this.updateMemes();
    });
    this.filterService.filterTextChangeEmitter.subscribe(() => {
      this.updateMemes();
    });
  }

  updateMemes() {
    this.memesForDisplay = this.getMemesForDisplay();
  }

  getMemesForDisplay() {
    const lowerMemeIDBound = (this.pageCounterService.getCurrentPage() - 1) * this.pageCounterService.getMemesPerPage();
    const highMemeIDBound = lowerMemeIDBound + this.pageCounterService.getMemesPerPage();

    const filteredMemes: Meme[] =
      this.filterComponent.filterMemes(this.memeStorageService.getMemes(), highMemeIDBound);
    return filteredMemes.slice(lowerMemeIDBound, highMemeIDBound);
  }

  deleteMeme(meme: Meme) {
    const message: ItskoResponse = this.memeStorageService.deleteMeme(meme);
    if (message === null) {
      console.log('fuck');
      return;
    }
    if (message.getStatus() === Status.NOT_ALRIGHT) {
      console.log(message.getMessage());
    }
  }

  canManipulateSource() {
    return this.memeStorageService.isAtHomeDomain();
  }

  editMeme(meme: Meme) {
    // this.submitterService
  }
}
