import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Meme} from '../classes/Meme';
import {DomainService} from './domain.service';

type rawMeme = Array<{title, image}>;

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;
  private memes: Meme[];

  @Output() loadedMemesEmitter = new EventEmitter();
  @Output() filterWordChangeEmitter = new EventEmitter();

  constructor(private http: HttpClient, private domainService: DomainService) {
    this.memes = [];
    this.domainService.changedDomainEmitter.subscribe((newDomain) => {
      this.setSource(newDomain.getAddress());
    });
  }

  getAllData() {
    const getRequest = this.sourceURL + '/meme';
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest).subscribe((response: rawMeme) => {
      this.memes = [];
      for (const meme of response) {
        this.memes.push(new Meme(meme.title, meme.image));
      }
      this.loadedMemesEmitter.emit();
    });
  }

  getMemes() {
    return this.memes;
  }

  setSource(newURL: string) {
    this.sourceURL = newURL;
    this.getAllData();
  }

  getNumberOfMemes() {
    return this.memes.length;
  }

  deleteMeme(title: string) {
    const url = `${this.domainService.getCurrentDomain().getAddress()}/delete?meme-title=${title}`;
    console.log(url);
    return this.http.delete(url)
      .subscribe(
        () => console.log('Success'),
        error => throwError(error)
        );
  }
}
