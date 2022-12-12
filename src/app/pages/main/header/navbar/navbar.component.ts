import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EstablishmentDto } from '../../../../rest/establishments/establishment.dto';
import { EstablishmentsService } from '../../../../rest/establishments/establishment.service';
import { filter, Observable, Subject, switchMap, zip } from 'rxjs';
import { AddEstablishmentFormComponent } from '../../../../shared/components/add-establishment-form/add-establishment-form.component';
import { MainService } from '../../main.service';
import { ImageService, UploadImageDto } from '../../../../rest/images/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ],
  providers: [
    ImageService,
  ],
})

export class NavbarComponent {
  establishmentOpenNowChanged: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private readonly establishmentsService: EstablishmentsService,
    private readonly imageService: ImageService,
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
        this.submitEstablishment(establishment);
      });
  };

  onOpenNowEmitted() {
    this.mainService.isOpenNowChecked = !this.mainService.isOpenNowChecked;
    this.mainService.onEstablishmentsParamsChanged({ openNow: this.mainService.isOpenNowChecked });
  }

  private submitEstablishment(establishment: EstablishmentDto): void {

    const listImage$: Observable<UploadImageDto> = this.imageService.uploadImage(establishment.listImage);
    const detailsMainImage$: Observable<UploadImageDto> = this.imageService.uploadImage(establishment.detailsMainImage);
    const detailsImages$: Observable<UploadImageDto>[] = [];

    for (let image of establishment.detailsImages as []) {
      detailsImages$.push(this.imageService.uploadImage(image));
    }

    zip([ listImage$, detailsMainImage$, ...detailsImages$ ]).pipe(
      switchMap(observablesResult => {
        establishment.listImageName = observablesResult[0].filename;
        establishment.detailsMainImageName = observablesResult[1].filename;
        establishment.detailsImagesNames = observablesResult.slice(2).map(item => item.filename);

        delete establishment.listImage;
        delete establishment.detailsMainImage;
        delete establishment.detailsImages;

        return this.establishmentsService.createEstablishment(establishment);
      }),
    ).subscribe();
  }
}
