import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CuisineDto } from 'src/app/rest/cuisines/cuisine.dto';
import { TypeDto } from '../../../rest/types/type.dto';
import { ServiceDto } from '../../../rest/services/service.dto';

export interface DialogData {
  types: TypeDto[];
  kitchens: CuisineDto[];
  services: ServiceDto[];
}

@Component({
  templateUrl: './form-add-establishment.html',
  styleUrls: ['./form-add-establishment.css'],
  providers: [],
})

export class FormAddEstablishmentComponent implements OnInit {
  newEstablishmentForm!: FormGroup;
  id!: string;

  types: TypeDto[] = [];
  cuisines: CuisineDto[] = [];
  services: ServiceDto[] = [];

  constructor(
    private fB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
  ) {
  };

  ngOnInit() {
    console.log(this.dialogData);
    Object.assign(this, this.dialogData);
    this.initForm();
  }

  private initForm() {
    this.newEstablishmentForm = this.fB.group({
      name: [ '', [ Validators.required ] ],
      phone: [ '+380', [ Validators.required ] ],
      information: [ '', [ Validators.required ] ],
      cuisine: [ '', [ Validators.required ] ],
      type: [ '', [ Validators.required ] ],
      service: [ '', [ Validators.required ] ],
      socialmedia: [ '', [ Validators.required ] ],
      schedule: [ '', [ Validators.required ] ],
      map: [ '', [ Validators.required ] ],
      address: [ '', [ Validators.required ] ],
    });

    // this.newCateringEstablishmentForm.get('recordMaster')?.valueChanges
    //   .subscribe(id => this.id = this.masters
    //     .find(master => master.id === id)?.masterCategory || '');
  }
}
