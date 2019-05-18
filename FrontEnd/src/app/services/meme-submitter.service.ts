import {HttpClient, HttpRequest} from '@angular/common/http';
import {DomainService} from './domain.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemeSubmitterService {
  private creationEndpoint = '/create';
  private editEndpoint = '/edit';

  private file: File;
  private title: string;
  private id: string;
  private extension: string;

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
    formData.append('id', this.id);
    formData.append('extension', this.extension);

    return formData;
  }

  public create() {
    if (!this.title || !this.file) {
      console.log('Meme not ready for submission');
      return this.http.request(null);
    }
    const formData = this.constructFormData();

    const req = new HttpRequest('POST', this.creationEndpoint, formData, {
      // reportProgress: true,
      responseType: 'text'
    });
    console.log(this.id);
    console.log(this.title);
    console.log(this.file);
    console.log(this.extension);
    this.reset();
    return this.http.request(req);
  }

  public edit() {
    if (!this.title || !this.id) {
      console.log('I don\'t know which meme is for updating');
      return this.http.request(null);
    }
    const formData = this.constructFormData();

    const req = new HttpRequest('PUT', this.editEndpoint, formData, {
      responseType: 'text'
    });
    console.log(this.id);
    console.log(this.title);
    console.log(this.file);
    console.log(this.extension);
    this.reset();
    return this.http.request(req);
  }

  reset() {
    this.setFile(null);
    this.setTitle(null);
  }

  // in the ideal case these setters would implement some exceptions
  // but the concept of the ideal is a government manipulation and a lie
  // t. watched 2 minutes of Zeitgeist
  public setFile(file: File) {
    this.file = file;
    if (file !== null) {
      this.extension = file.name.split('.').pop();
    }
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setID(id: string) {
    this.id = id;
  }

  public getTitle() {
    return this.title;
  }
}
