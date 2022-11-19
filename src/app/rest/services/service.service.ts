import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { ServiceDto } from './service.dto';

@Injectable()
export class ServicesService {

  constructor(private http: HttpClient) {
  }

  getServices(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>('/api/services').
    pipe(
      map(services => services.map(service => new ServiceDto(service))),
    );

  }
}
