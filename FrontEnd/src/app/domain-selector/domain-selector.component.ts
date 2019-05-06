import { Component, OnInit } from '@angular/core';

import { DomainService } from '../services/domain.service';

type RawDomainArray = Array<{name, address}>;

@Component({
  selector: 'app-domain-selector',
  templateUrl: './domain-selector.component.html',
  styleUrls: ['./domain-selector.component.css']
})
export class DomainSelectorComponent implements OnInit {
  domains: MemeDomain[] = [];

  constructor(private data: DomainService) { }

  ngOnInit() {
    this.data.getData().subscribe((domainArray: RawDomainArray) => {
      for (const domain of domainArray) {
        this.domains.push(new MemeDomain(domain.name, domain.address));
      }
    });
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
