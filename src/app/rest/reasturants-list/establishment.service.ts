import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {map, Observable} from "rxjs";
import { EstablishmentDto } from './establishment.dto';



@Injectable()
export class EstablishmentsService {

  constructor(private http: HttpClient) {
  }

  getEstablishments(): Observable<EstablishmentDto[]> {
    // let params = { id, name, information, address_title, address, establishment_map};
    return this.http.get<EstablishmentDto[]>('/api/establishments').
      pipe(
        map(establishments => establishments.map(establishment => new EstablishmentDto(establishment))),
    );

  }

  getEstablishment(id: string): Observable<EstablishmentDto> {
    // let params = { id, name, information, address_title, address, establishment_map};
    return this.http.get<EstablishmentDto>(`/api/establishment/${id}`)

  }

  createEstablishment(establishment: EstablishmentDto): Observable<EstablishmentDto> {
    return this.http.post<EstablishmentDto>('/api/establishments', establishment);
  }
}

