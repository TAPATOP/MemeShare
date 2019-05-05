import { Component, OnInit } from '@angular/core';

import { DataSourceService } from '../data-source.service';

@Component({
  selector: 'app-meme-container',
  templateUrl: './meme-container.component.html',
  styleUrls: ['./meme-container.component.css']
})
export class MemeContainerComponent implements OnInit {

  memes: Meme[] = [];

  constructor(private data: DataSourceService) { }

  ngOnInit() {
    this.data.getData().subscribe(response => {
      let placeholder;
      placeholder = response;
      for (const meme of placeholder.memes) {
        this.memes.push(new Meme(meme.title, meme.imageURL));
      }
    });
  }
}

class Meme {
  private title: string;
  private imageURL: string;

  constructor(title: string, imageURL: string) {
    this.title = title;
    this.imageURL = imageURL;
  }

  getTitle() {
    return this.title;
  }
}
