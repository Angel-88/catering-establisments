import { Component, OnInit } from '@angular/core';
import { EstablishmentsParams, EstablishmentsService } from '../../../rest/establishments/establishment.service';
import { EstablishmentDto } from '../../../rest/establishments/establishment.dto';
import { MainService } from '../main.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ],
  providers: [
    EstablishmentsService,
  ],
})
export class ListComponent implements OnInit {

  establishments: EstablishmentDto[] = [];

  constructor(
    private readonly establishmentService: EstablishmentsService,
    private readonly mainService: MainService,
  ) {
  }

  ngOnInit(): void {
    this.initEstablishments();

    this.mainService.establishmentsParamsChanged$.subscribe(establishmentsParams => {
      this.initEstablishments(establishmentsParams);
    });
  }

  private initEstablishments(establishmentsParams?: EstablishmentsParams): void {
    this.establishmentService.getEstablishments(establishmentsParams).subscribe(establishments => {
      this.establishments = establishments;
    });
  }
}
