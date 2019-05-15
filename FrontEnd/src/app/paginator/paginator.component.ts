import { Component, OnInit } from '@angular/core';
import {PageCounterService} from '../services/page-counter.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  constructor(public pageCounterService: PageCounterService) { }

  ngOnInit() {
  }

}
