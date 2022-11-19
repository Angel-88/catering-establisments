import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { CuisineDto } from './cuisine.dto';

@Injectable()
export class CuisinesService {

  constructor(private http: HttpClient) {
  }

  getCuisines(): Observable<CuisineDto[]> {
    return this.http.get<CuisineDto[]>('/api/cuisines').
      pipe(
        map(cuisines => cuisines.map(cuisine => new CuisineDto(cuisine))),
    );

  }
}
