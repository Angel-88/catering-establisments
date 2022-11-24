import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from '../../../rest/establishments/establishment.service';
import { EstablishmentDto } from '../../../rest/establishments/establishment.dto';

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
    private establishmentService: EstablishmentsService) {
  }

  // establishments = [
  //   {
  //     title: 'Nice 2 meet U',
  //     subtitle: 'Кафе',
  //     image: '../../../assets/icons/1_1.jpg',
  //     workSchedule: [ '10:00-21:00' ],
  //     address: [ 'Хрещатик, 256' ],
  //   }]


  ngOnInit(): void {
    this.initEstablishments();
  }

  private initEstablishments(): void {
    this.establishmentService.getEstablishments().subscribe(establishments => {
      this.establishments = establishments;
    })
  }
}
