import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CuisineDto } from 'src/app/rest/cuisines/cuisine.dto';
import { TypeDto } from '../../../rest/types/type.dto';
import { ServiceDto } from '../../../rest/services/service.dto';
import { DayEnum, EstablishmentDto, ScheduleDto } from '../../../rest/establishments/establishment.dto';
import { filter, Observable } from 'rxjs';
import { DishDto } from '../../../rest/dishes/dish.dto';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
import { SharedDataService } from '../../../core/services/shared-data/shared-data.service';

export interface DialogData {
  // types: TypeDto[];
  // cuisines: CuisineDto[];
  // services: ServiceDto[];
  // dishes: DishDto[];
}

@Component({
  templateUrl: './add-establishment-form.html',
  styleUrls: [ './add-establishment-form.css' ],
})
export class AddEstablishmentFormComponent implements OnInit {
  newEstablishmentForm!: FormGroup;

  types: Observable<TypeDto[]>;
  cuisines: Observable<CuisineDto[]>;
  services: Observable<ServiceDto[]>;
  dishes: Observable<DishDto[]>;

  schedule: ScheduleDto = {
    [DayEnum.MONDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.TUESDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.WEDNESDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.THURSDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.FRIDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.SATURDAY]: { startTime: '08:00', endTime: '21:00' },
    [DayEnum.SUNDAY]: { startTime: '08:00', endTime: '21:00' },
  };

  constructor(
    private readonly fB: FormBuilder,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
    private readonly sharedDataService: SharedDataService,
    private readonly matDialogRef: MatDialogRef<AddEstablishmentFormComponent>,
  ) {};

  ngOnInit() {
    Object.assign(this, this.dialogData);
    this.initSharedDataObservables();
    this.initForm();
  }

  openScheduleDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.minWidth = '500px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = {};

    this.dialog.open(ScheduleDialogComponent, dialogConfig).afterClosed()
      .pipe(filter(Boolean))
      .subscribe((schedule: ScheduleDto) => {
        this.schedule = schedule;
        console.log(this.schedule);
      });
  }

  save() {
    const formValue = this.newEstablishmentForm.getRawValue();
    const establishment = new EstablishmentDto({
      name: formValue.name,
      address: { geo: formValue.addressGeo, geoTitle: formValue.addressGeoTitle, iframe: formValue.addressIframe },
      dishes: formValue.dishes,
      instagram: formValue.instagram,
      facebook: formValue.facebook,
      information: formValue.information,
      phones: formValue.phone.split(','),
      schedule: this.schedule,
      services: formValue.services,
      types: formValue.types,
      cuisines: formValue.cuisines,
    });
    this.matDialogRef.close(establishment);
  }

  private initSharedDataObservables(): void {
    this.types = this.sharedDataService.getTypesObservable();
    this.services = this.sharedDataService.getServicesObservable();
    this.cuisines = this.sharedDataService.getCuisinesObservable();
    this.dishes = this.sharedDataService.getDishesObservable();
  }

  private initForm(): void {
    this.newEstablishmentForm = this.fB.group({
      name: [ '', [ Validators.required ] ],
      phone: [ '+380', [ Validators.required ] ],
      information: [ '', [ Validators.required ] ],
      cuisines: [ [], [ Validators.required ] ],
      types: [ [], [ Validators.required ] ],
      services: [ [], [ Validators.required ] ],
      dishes: [ [], [ Validators.required ] ],
      instagram: [ '', [ Validators.required ] ],
      facebook: [ '', [ Validators.required ] ],
      addressGeo: [ '', [ Validators.required ] ],
      addressGeoTitle: [ '', [ Validators.required ] ],
      addressIframe: [ '', [ Validators.required ] ],
    });
  }
}
