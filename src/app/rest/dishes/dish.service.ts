import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { DishDto } from './dish.dto';

@Injectable()
export class DishesService {

  constructor(private http: HttpClient) {
  }

  getDishes(): Observable<DishDto[]> {
    return this.http.get<DishDto[]>('/api/dishes').
      pipe(
        map(dishes => dishes.map(dishes => new DishDto(dishes))),
    );

  }
}
