import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MemeDomain} from '../classes/MemeDomain';

type RawDomainArray = Array<{name, address}>;

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private sourceURL: string;
  private currentDomain: MemeDomain;
  domains: MemeDomain[] = [];

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5cd138cb3300003528b12775?albatros=dva');
  }

  loadDomains() {
    this.http.get(this.sourceURL).subscribe((domainArray: RawDomainArray) => {
      for (const domain of domainArray) {
        this.domains.push(new MemeDomain(domain.name, domain.address));
      }
    });
    return ;
  }

  private setSource(source: string) {
    this.sourceURL = source;
  }

  setCurrentDomain(domain: MemeDomain) {
    this.currentDomain = domain;
  }

  getCurrentDomain() {
    return this.currentDomain;
  }

  getDomains() {
    return this.domains;
  }
}
