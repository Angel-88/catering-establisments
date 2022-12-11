import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EstablishmentDto } from '../../../../rest/establishments/establishment.dto';
import { EstablishmentsService } from '../../../../rest/establishments/establishment.service';
import { filter, Subject } from 'rxjs';
import { AddEstablishmentFormComponent } from '../../../../shared/components/add-establishment-form/add-establishment-form.component';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
})

export class NavbarComponent {
  establishmentOpenNowChanged: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private readonly establishmentsService: EstablishmentsService,
    public mainService: MainService,
  ) {}

  addCateringEstablishment(): void {
    const dialogConfig = new MatDialogConfig();


    dialogConfig.width = '30%';
    dialogConfig.minWidth = '500px';
    dialogConfig.data = {};

    this.dialog.open(AddEstablishmentFormComponent, dialogConfig).afterClosed()
      .pipe(filter(Boolean))
      .subscribe((establishment: EstablishmentDto) => {
        console.log(establishment);

        this.submitEstablishment(establishment);
      });
  };

  onOpenNowEmitted() {
    this.mainService.isOpenNowChecked = !this.mainService.isOpenNowChecked;
    this.mainService.onEstablishmentsParamsChanged({ openNow: this.mainService.isOpenNowChecked });
  }

  private submitEstablishment(establishment: EstablishmentDto): void {
    this.establishmentsService.createEstablishment(establishment).subscribe();
  }
}
