import { Component, OnInit } from '@angular/core';
import {MemeSubmitterService} from '../services/meme-submitter.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navBarTitle: string;
  constructor(public memeSubmitter: MemeSubmitterService) { }

  ngOnInit() {
    this.navBarTitle = 'Quoter';
  }

}
