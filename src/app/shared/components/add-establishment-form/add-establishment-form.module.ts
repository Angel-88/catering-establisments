import {NgModule} from '@angular/core';

import {AddEstablishmentFormComponent} from "./add-establishment-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCommonModule, MatNativeDateModule} from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatIconModule } from '@angular/material/icon';
import { ScheduleDialogModule } from '../schedule-dialog/schedule-dialog.module';

@NgModule({
  imports:
    [
      MatDialogModule,
      MatButtonModule,
      MatCommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      CommonModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      MatIconModule,
      ScheduleDialogModule
    ],
  exports: [AddEstablishmentFormComponent],
  declarations: [AddEstablishmentFormComponent],
})
export class AddEstablishmentFormModule {
}
