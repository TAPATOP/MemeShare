import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MemeDomain} from '../classes/MemeDomain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private sourceURL: string;
  private currentDomain: MemeDomain;

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5cd138cb3300003528b12775?albatros=dva');
  }

  getData() {
    return this.http.get(this.sourceURL);
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
}
