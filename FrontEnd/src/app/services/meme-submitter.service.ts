import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DomainService} from './domain.service';

export class MemeSubmitterService {

  constructor(
    private domainService: DomainService,
    private http: HttpClient
  ) {}
}
