import { Component, OnInit } from '@angular/core';

import { DomainService } from '../services/domain.service';
import { MemeStorageService } from '../services/meme-storage.service';
import { MemeDomain } from '../classes/MemeDomain';

@Component({
  selector: 'app-domain-selector',
  templateUrl: './domain-selector.component.html',
  styleUrls: ['./domain-selector.component.css']
})
export class DomainSelectorComponent implements OnInit {
  constructor(
    private domainService: DomainService,
    private memeStorage: MemeStorageService
  ) { }

  ngOnInit() {
    this.domainService.loadDomains();
  }

  setDomain(domain: MemeDomain) {
    this.domainService.setCurrentDomain(domain);
    this.memeStorage.setSource(domain.getAddress());
  }

  getCurrentDomain() {
    return this.domainService.getCurrentDomain();
  }
}
