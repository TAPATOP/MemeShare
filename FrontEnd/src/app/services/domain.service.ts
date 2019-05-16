import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MemeDomain} from '../classes/MemeDomain';
import {environment} from '../../environments/environment';

type RawDomainArray = Array<{name, address}>;

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private sourceURL: string;
  private currentDomain: MemeDomain;
  domains: MemeDomain[] = [];
  @Output() changedDomainEmitter = new EventEmitter<MemeDomain>();

  constructor(private http: HttpClient) {
    this.setSource(environment.domainsHost);
  }

  loadDomains() {
    this.domains = [];
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
    this.changedDomainEmitter.emit(domain);
  }

  getCurrentDomain() {
    return this.currentDomain;
  }

  getDomains() {
    return this.domains;
  }
}
