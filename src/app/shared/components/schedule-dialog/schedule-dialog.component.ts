import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ScheduleDto } from '../../../rest/establishments/establishment.dto';

export interface DialogData {
  schedule: ScheduleDto;
}

@Component({
  templateUrl: './schedule-dialog.html',
  styleUrls: [ './schedule-dialog.css' ],
})

export class ScheduleDialogComponent implements OnInit {
  scheduleForm!: FormGroup;

  schedule: ScheduleDto;

  constructor(
    private readonly fB: FormBuilder,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
  ) {};

  ngOnInit() {
    Object.assign(this, this.dialogData);
    this.initForm();
  }

  private initForm() {
    this.scheduleForm = this.fB.group({
      mondayStartTime: [ '08:00', [ Validators.required ] ],
      mondayEndTime: [ '21:00', [ Validators.required ] ],
      tuesdayStartTime: [ '08:00', [ Validators.required ] ],
      tuesdayEndTime: [ '21:00', [ Validators.required ] ],
      wednesdayStartTime: [ '08:00', [ Validators.required ] ],
      wednesdayEndTime: [ '21:00', [ Validators.required ] ],
      thursdayStartTime: [ '08:00', [ Validators.required ] ],
      thursdayEndTime: [ '21:00', [ Validators.required ] ],
      fridayStartTime: [ '08:00', [ Validators.required ] ],
      fridayEndTime: [ '21:00', [ Validators.required ] ],
      saturdayStartTime: [ '08:00', [ Validators.required ] ],
      saturdayEndTime: [ '21:00', [ Validators.required ] ],
      sundayStartTime: [ '08:00', [ Validators.required ] ],
      sundayEndTime: [ '21:00', [ Validators.required ] ],
    });
  }
}
