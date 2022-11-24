import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CuisineDto } from 'src/app/rest/cuisines/cuisine.dto';
import { TypeDto } from '../../../rest/types/type.dto';
import { ServiceDto } from '../../../rest/services/service.dto';
import { DayEnum, EstablishmentDto, ScheduleDto } from '../../../rest/establishments/establishment.dto';
import { filter } from 'rxjs';
import { DishDto } from '../../../rest/dishes/dish.dto';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

export interface DialogData {
  types: TypeDto[];
  kitchens: CuisineDto[];
  services: ServiceDto[];
}

@Component({
  templateUrl: './add-establishment-form.html',
  styleUrls: [ './add-establishment-form.css' ],
  providers: [],
})

export class AddEstablishmentFormComponent implements OnInit {
  newEstablishmentForm!: FormGroup;
  id!: string;

  types: TypeDto[] = [];
  cuisines: CuisineDto[] = [];
  services: ServiceDto[] = [];
  dishes: DishDto[] = [];

  schedule: ScheduleDto = {
    [DayEnum.MONDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.TUESDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.WEDNESDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.THURSDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.FRIDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.SATURDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
    [DayEnum.SUNDAY]: { id: '', name: 'pon', endTime: '', startTime: '' },
  };

  constructor(
    private readonly fB: FormBuilder,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
  ) {};

  ngOnInit() {
    Object.assign(this, this.dialogData);
    this.initForm();
  }

  openScheduleDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.minWidth = '500px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
    };

    this.dialog.open(ScheduleDialogComponent, dialogConfig).afterClosed()
      .pipe(filter(Boolean))
      .subscribe((item: EstablishmentDto) => {
        console.log(item);
      })
  }

  private initForm() {
    this.newEstablishmentForm = this.fB.group({
      name: [ '', [ Validators.required ] ],
      phone: [ '+380', [ Validators.required ] ],
      information: [ '', [ Validators.required ] ],
      cuisines: [ [], [ Validators.required ] ],
      types: [ [], [ Validators.required ] ],
      services: [ [], [ Validators.required ] ],
      dishes: [ [], [ Validators.required ] ],
      instagram: [ '' ],
      facebook: [ '' ],
      schedule: [ null, [ Validators.required ] ],
      addressGeo: [ '', [ Validators.required ] ],
      addressGeoTitle: [ '', [ Validators.required ] ],
      addressIframe: [ '', [ Validators.required ] ],
    });

    // this.newCateringEstablishmentForm.get('recordMaster')?.valueChanges
    //   .subscribe(id => this.id = this.masters
    //     .find(master => master.id === id)?.masterCategory || '');
  }
}
