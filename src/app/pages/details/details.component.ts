import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from '../../rest/establishments/establishment.service';
import { EstablishmentDto } from '../../rest/establishments/establishment.dto';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, zip } from 'rxjs';
import { ImageService } from '../../rest/images/image.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.css' ],
  providers: [
    EstablishmentsService,
    ImageService,
  ],
})
export class DetailsComponent implements OnInit {
  establishment!: EstablishmentDto;
  establishmentId: string;

  constructor(
    private readonly establishmentService: EstablishmentsService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly imageService: ImageService,
  ) {
    activatedRouter.params.subscribe(params => {
      this.establishmentId = params['id'];
    });
  }

  ngOnInit(): void {
    this.initEstablishment();
  }

  private initEstablishment(): void {
    this.establishmentService.getEstablishment(this.establishmentId)
      .pipe(
        switchMap(establishment => {
          this.establishment = establishment;

          const listImage$: Observable<Blob> = this.imageService.getImage(establishment.listImageName);
          const detailsMainImage$: Observable<Blob> = this.imageService.getImage(establishment.detailsMainImageName);
          const detailsImages$: Observable<Blob>[] = [];

          for (let imageName of establishment.detailsImagesNames) {
            detailsImages$.push(this.imageService.getImage(imageName));
          }

          return zip([ listImage$, detailsMainImage$, ...detailsImages$ ]);
        }),
      ).subscribe(observablesResult => {
      this.establishment.detailsImages = [];
      this.createImageFromBlob('listImage', [ observablesResult[0] ]);
      this.createImageFromBlob('detailsMainImage', [ observablesResult[1] ]);
      this.createImageFromBlob('detailsImages', observablesResult.slice(2));
    });
  }

  private createImageFromBlob(establishmentPropertyName: string, images: Blob[]): void {
    for (let image of images) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        if (establishmentPropertyName.includes('detailsImages')) {
          this.establishment[establishmentPropertyName].push(reader.result);
        } else {
          this.establishment[establishmentPropertyName] = reader.result;
        }
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    }
  }
}
