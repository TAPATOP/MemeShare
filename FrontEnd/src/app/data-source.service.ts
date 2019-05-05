import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  private sourceURL: string;

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5ccf3c663000009d1652c4b1');
  }

  getData() {
    return this.http.get(this.sourceURL);
  }

  setSource(newURL: string) {
    this.sourceURL = newURL;
  }
}
