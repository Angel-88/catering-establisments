import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map, Observable } from "rxjs";
import { EstablishmentDto } from './establishment.dto';

export interface EstablishmentsParams {
  name?: string;
  typeIds?: string[];
  dishIds?: string[];
  cuisineIds?: string[];
  serviceIds?: string[];
  openNow?: boolean;
}

@Injectable()
export class EstablishmentsService {

  constructor(private readonly http: HttpClient) {}

  getEstablishments(establishmentsParams?: EstablishmentsParams): Observable<EstablishmentDto[]> {
    let params = {};

    if (establishmentsParams) {
      for (let [ key, value ] of Object.entries(establishmentsParams)) {
        if (!!key && (Array.isArray(value) && value.length || !Array.isArray(value) && !!value)) {
          params[key] = value;
        }
      }
    }

    return this.http.get<EstablishmentDto[]>('/api/establishments', { params }).pipe(
      map(establishments => establishments.map(establishment => new EstablishmentDto(establishment))),
    );
  }

  getEstablishment(id: string): Observable<EstablishmentDto> {
    return this.http.get<EstablishmentDto>(`/api/establishments/${ id }`);

  }

  createEstablishment(establishment: EstablishmentDto): Observable<EstablishmentDto> {
    return this.http.post<EstablishmentDto>('/api/establishments', establishment);
  }
}

