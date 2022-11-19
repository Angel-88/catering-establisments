import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CuisineDto } from 'src/app/rest/cuisines/cuisine.dto';
import { EstablishmentDto } from '../../../../rest/reasturants-list/establishment.dto';
import { EstablishmentsService } from '../../../../rest/reasturants-list/establishment.service';
import { ServiceDto } from '../../../../rest/services/service.dto';
import { TypeDto } from '../../../../rest/types/type.dto';
import { ServicesService } from '../../../../rest/services/service.service';
import { CuisinesService } from '../../../../rest/cuisines/cuisine.service';
import { TypesService } from '../../../../rest/types/type.service';
import { filter } from 'rxjs';
import { FormAddEstablishmentComponent } from '../../../../shared/components/form-add-establishment/form-add-establishment.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
})

export class NavbarComponent implements OnInit {

  types: TypeDto[] = [];
  services: ServiceDto[] = [];
  kitchens: CuisineDto[] = [];

  constructor(
    private dialog: MatDialog,
    private typesService: TypesService,
    private kitchensService: CuisinesService,
    private servicesService: ServicesService,
    private listService: EstablishmentsService,
  ) {
  }

  ngOnInit(): void {
  }

  addCateringEstablishment(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30%';
    dialogConfig.minWidth = '500px';
    dialogConfig.data = {
      types: this.types,
      services: this.services,
      kitchens: this.kitchens,
    };

      this.dialog.open(FormAddEstablishmentComponent, dialogConfig).afterClosed()
        .pipe(filter(Boolean))
        .subscribe((item: EstablishmentDto) => {
          console.log(item);

          this.submitList(item);
        })
    };

    private submitList(item: EstablishmentDto): void {
        // this.listService.createEstablishment(item).subscribe();
      }
  }
