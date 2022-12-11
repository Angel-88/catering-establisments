import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EstablishmentsParams } from '../../rest/establishments/establishment.service';

@Injectable()
export class MainService {
  establishments: EstablishmentsParams = {};
  isOpenNowChecked: boolean = false;

  get establishmentsParamsChanged$(): Observable<EstablishmentsParams> {
    return this.establishmentsParams$.asObservable();
  }

  private readonly establishmentsParams$ = new Subject<EstablishmentsParams>();

  onEstablishmentsParamsChanged(establishmentsParams: EstablishmentsParams): void {
    Object.assign(this.establishments, establishmentsParams);
    this.establishmentsParams$.next(this.establishments);
  }
}
