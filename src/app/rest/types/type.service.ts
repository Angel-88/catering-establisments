import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { TypeDto } from './type.dto';

@Injectable()
export class TypesService {

  constructor(private http: HttpClient) {
  }

  getTypes(): Observable<TypeDto[]> {
    return this.http.get<TypeDto[]>('/api/types').
      pipe(
        map(types => types.map(type => new TypeDto(type))),
    );

  }
}
