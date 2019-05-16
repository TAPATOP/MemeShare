import { Component, OnInit } from '@angular/core';
import {DomainService} from '../services/domain.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {

  constructor(public domainService: DomainService) { }

  ngOnInit() {
    this.domainService.setCurrentDomain(this.domainService.getDomains()[0]);
  }

}
