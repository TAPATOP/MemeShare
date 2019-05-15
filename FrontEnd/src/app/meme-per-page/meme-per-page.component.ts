import { Component, OnInit } from '@angular/core';
import {PageCounterService} from '../services/page-counter.service';

@Component({
  selector: 'app-meme-per-page',
  templateUrl: './meme-per-page.component.html',
  styleUrls: ['./meme-per-page.component.css']
})
export class MemePerPageComponent implements OnInit {

  memesPerPageOptions: number[];

  constructor(public pageCounter: PageCounterService) { }

  ngOnInit() {
    this.memesPerPageOptions = [1, 3, 6, 9, 9001];
  }

  setMemesPerPage(num: number) {
    this.pageCounter.setMemesPerPage(num);
  }

}
