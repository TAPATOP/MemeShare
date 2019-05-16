import { Component, OnInit } from '@angular/core';
import {PageCounterService} from '../services/page-counter.service';
import {DomainService} from '../services/domain.service';
import {MemeDomain} from '../classes/MemeDomain';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private domainService: DomainService) {
    this.domainService.setCurrentDomain(new MemeDomain('Home', environment.homeDomain)); }

  ngOnInit() {
    this.domainService.setCurrentDomain(new MemeDomain('Home', environment.homeDomain));
  }

}
