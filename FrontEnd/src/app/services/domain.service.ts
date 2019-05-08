import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private sourceURL: string;

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5cd138cb3300003528b12775?albatros=dva');
  }

  // ASK: what the fug
  getData() {
    return this.http.get(this.sourceURL);
  }

  private setSource(source: string) {
    this.sourceURL = source;
  }
}
