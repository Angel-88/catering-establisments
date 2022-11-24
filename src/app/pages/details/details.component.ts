import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from '../../rest/establishments/establishment.service';
import { EstablishmentDto } from '../../rest/establishments/establishment.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.css' ],
  providers: [
    EstablishmentsService,
  ],
})
export class DetailsComponent implements OnInit {
  establishment!: EstablishmentDto;
  establishmentId: string;

  constructor(
    private readonly establishmentService: EstablishmentsService,
    private readonly activatedRouter: ActivatedRoute,
  ) {
    activatedRouter.params.subscribe(params => {
      this.establishmentId = params['id'];
    })
  }

  ngOnInit(): void {
    this.initEstablishment();
  }

  private initEstablishment(): void {
    this.establishmentService.getEstablishment(this.establishmentId).subscribe(establishment => {
      this.establishment = establishment;
    });
  }
}
