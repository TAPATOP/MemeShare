import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {FilterService} from '../services/filter.service';
import {Meme} from '../classes/Meme';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  constructor(private filterService: FilterService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      text: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit(text: string) {
    this.filterService.setFilterWord(text.toLowerCase());
  }

  // ASK: Where should this go
  filterMemes(memes: Meme[], sizeForStop: number) {
    const filteredMemes: Meme[] = [];
    for (const meme of memes) {
      if (filteredMemes.length > sizeForStop) {
        break;
      }
      if (this.matchesFilter(meme)) {
        filteredMemes.push(meme);
      }
    }
    return filteredMemes;
  }

  matchesFilter(meme: Meme) {
    const filter = this.filterService.getFilter();
    if (null === filter || '' === filter) {
      return true;
    }
    return meme.getTitle().toLowerCase().includes(filter);
  }
}
