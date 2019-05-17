import {HttpClient, HttpRequest} from '@angular/common/http';
import {DomainService} from './domain.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemeSubmitterService {

  constructor(
    private domainService: DomainService,
    private http: HttpClient
  ) {}

  public uploadImage(image: File, name: string) {
    const formData = new FormData();

    formData.append('title', name);
    formData.append('file', image, name);

    const req = new HttpRequest('POST', '/create', formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
