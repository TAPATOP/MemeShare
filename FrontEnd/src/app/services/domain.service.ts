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
    this.setSource('http://www.mocky.io/v2/5cd983e43000006621c016c6');
    this.http.get('http://localhost:8080/meme', {responseType: 'json'}).subscribe((data) => {
      console.log(data);
    });
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
