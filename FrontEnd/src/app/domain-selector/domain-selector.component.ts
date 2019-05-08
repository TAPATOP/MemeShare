import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { DomainService } from '../services/domain.service';
import { MemeStorageService } from '../services/meme-storage.service';
import { MemeDomain } from '../classes/MemeDomain';

type RawDomainArray = Array<{name, address}>;

@Component({
  selector: 'app-domain-selector',
  templateUrl: './domain-selector.component.html',
  styleUrls: ['./domain-selector.component.css']
})
export class DomainSelectorComponent implements OnInit {
  domains: MemeDomain[] = [];

  constructor(
    private domainService: DomainService,
    private memeStorage: MemeStorageService
  ) { }

  ngOnInit() {
    this.domainService.getData().subscribe((domainArray: RawDomainArray) => {
      console.log('I\'m the selector');
      for (const domain of domainArray) {
        this.domains.push(new MemeDomain(domain.name, domain.address));
      }
    });
  }

  setDomain(domain: MemeDomain) {
    this.domainService.setCurrentDomain(domain);
    this.memeStorage.setSource(domain.getAddress());
  }

  getCurrentDomain() {
    return this.domainService.getCurrentDomain();
  }
}
