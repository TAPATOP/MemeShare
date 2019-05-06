import { Component, OnInit } from '@angular/core';

import { DomainService } from '../services/domain.service';
import { MemeStorageService } from '../services/meme-storage.service';

type RawDomainArray = Array<{name, address}>;

@Component({
  selector: 'app-domain-selector',
  templateUrl: './domain-selector.component.html',
  styleUrls: ['./domain-selector.component.css']
})
export class DomainSelectorComponent implements OnInit {
  domains: MemeDomain[] = [];
  currentDomain: MemeDomain;

  constructor(private data: DomainService, private memeStorage: MemeStorageService) { }

  ngOnInit() {
    this.data.getData().subscribe((domainArray: RawDomainArray) => {
      for (const domain of domainArray) {
        this.domains.push(new MemeDomain(domain.name, domain.address));
      }
      this.setDomain(this.domains[0]);
    });
  }

  setDomain(domain: MemeDomain) {
    this.currentDomain = domain;
  }

  updateMemeService() {
    this.memeStorage.setSource(this.currentDomain.getAddress());
  }
}

class MemeDomain {
  private name: string;
  private address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): string {
    return this.address;
  }
}
