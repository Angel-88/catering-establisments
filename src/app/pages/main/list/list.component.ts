import { Component, OnInit } from '@angular/core';
import { EstablishmentsParams, EstablishmentsService } from '../../../rest/establishments/establishment.service';
import { EstablishmentDto } from '../../../rest/establishments/establishment.dto';
import { MainService } from '../main.service';
import { ImageService } from '../../../rest/images/image.service';
import { Observable, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ],
  providers: [
    EstablishmentsService,
    ImageService,
  ],
})
export class ListComponent implements OnInit {

  establishments: EstablishmentDto[] = [];

  constructor(
    private readonly establishmentService: EstablishmentsService,
    private readonly mainService: MainService,
    private readonly imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
    this.initEstablishments();

    this.mainService.establishmentsParamsChanged$.subscribe(establishmentsParams => {
      this.initEstablishments(establishmentsParams);
    });
  }

  private initEstablishments(establishmentsParams?: EstablishmentsParams): void {
    this.establishmentService.getEstablishments(establishmentsParams)
      .pipe(
        switchMap(establishments => {
          this.establishments = establishments;

          const listImageObservables$: Observable<Blob>[] = [];
          for (let establishment of establishments) {
            listImageObservables$.push(this.imageService.getImage(establishment.listImageName));
          }

          return zip(listImageObservables$);
        }),
      )
      .subscribe((ObservablesResult) => {
        for (let [ index, value ] of this.establishments.entries()) {
          this.createImageFromBlob('listImage', ObservablesResult, index);
        }
      });
  }

  private createImageFromBlob(establishmentPropertyName: string, images: Blob[], index): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.establishments[index][establishmentPropertyName] = reader.result;
    }, false);

    if (images[index]) {
      reader.readAsDataURL(images[index]);
    }
  }
}
