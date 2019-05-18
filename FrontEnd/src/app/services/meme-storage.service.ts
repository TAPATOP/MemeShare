import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Meme} from '../classes/Meme';
import {DomainService} from './domain.service';
import {ItskoResponse, Status} from '../classes/ItskoResponse';

type rawMeme = Array<{id: number, title: string, image: string}>;

@Injectable({
  providedIn: 'root'
})
export class MemeStorageService {
  private sourceURL: string;
  private memes: Meme[];

  @Output() loadedMemesEmitter = new EventEmitter();
  @Output() filterWordChangeEmitter = new EventEmitter();
  @Output() memeDeletedEmitter = new EventEmitter();

  constructor(private http: HttpClient, private domainService: DomainService) {
    this.memes = [];
    this.domainService.changedDomainEmitter.subscribe((newDomain) => {
      if (newDomain) {
        this.setSource(newDomain.getAddress());
      }
    });
  }

  getAllMemes() {
    const getRequest = this.sourceURL + '/meme';
    console.log('Fetching this: ' + getRequest);
    return this.http.get(getRequest).subscribe((response: rawMeme) => {
      this.memes = [];
      for (const meme of response) {
        this.memes.push(new Meme(meme.id, meme.title, meme.image));
      }
      this.loadedMemesEmitter.emit();
    });
  }

  getMemes() {
    return this.memes;
  }

  setSource(newURL: string) {
    this.sourceURL = newURL;
    this.getAllMemes();
  }

  getNumberOfMemes() {
    return this.memes.length;
  }

  deleteMeme(meme: Meme): ItskoResponse {
    const url = `${this.domainService.getCurrentDomain().getAddress()}/delete?id=${meme.getID()}`;
    console.log(url);
    this.http.delete(url)
      .subscribe(
        () => {},
        () => {
          return new ItskoResponse('Deletion messed up lol', Status.NOT_ALRIGHT);
        }
        );
    this.memes = this.memes.filter(item => item !== meme);
    this.memeDeletedEmitter.emit();
    return new ItskoResponse('Delete successful!', Status.ALRIGHT);
  }

  isAtHomeDomain() {
    return this.domainService.isAtHomeDomain();
  }
}
