import {HttpClient, HttpRequest} from '@angular/common/http';
import {DomainService} from './domain.service';
import {Injectable} from '@angular/core';
import {isRegExp} from 'util';

@Injectable({
  providedIn: 'root'
})
export class MemeSubmitterService {
  private endpoint = '/create';
  private method: string;
  private file: File;
  private title: string;

  constructor(
    private domainService: DomainService,
    private http: HttpClient
  ) {}

  public prepareImage(file: File, title: string) {
    this.setFile(file);
    this.setTitle(title);
  }

  private constructFormData(): FormData {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('file', this.file);
    return formData;
  }

  public upload() {
    if (!this.isReady()) {
      console.log('Meme not ready for submission');
      return this.http.request(null);
    }
    const formData = this.constructFormData();

    const req = new HttpRequest(this.method, this.endpoint, formData, {
      // reportProgress: true,
      responseType: 'text'
    });
    console.log('Sending' + this.file.name + ' with the title of ' + this.title + ' via this method: ' + this.method);
    this.reset();
    return this.http.request(req);
  }

  isReady(): boolean {
    return !(!this.title || !this.method || !this.file);
  }

  reset() {
    this.file = null;
    this.title = null;
  }

  // in the ideal case these setters would implement some exceptions
  // but the idea of the ideal is a government manipulation and a lie
  public setFile(file: File) {
    this.file = file;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setMethod(method: string) {
    this.method = method;
  }

  public getTitle() {
    return this.title;
  }
}
