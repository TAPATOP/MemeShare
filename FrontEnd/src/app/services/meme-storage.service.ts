import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;

  constructor(private http: HttpClient) {
    this.setSource('http://www.mocky.io/v2/5ccffa323200009b4400f95d');
  }

  getData() {
    return this.http.get(this.sourceURL);
  }

  setSource(newURL: string) {
    this.sourceURL = newURL;
  }
}
