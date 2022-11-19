import {NgModule} from '@angular/core';

import {FormAddEstablishmentComponent} from "./form-add-establishment.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCommonModule, MatNativeDateModule} from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";

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
    ],
  exports: [FormAddEstablishmentComponent],
  declarations: [FormAddEstablishmentComponent],
})
export class FormAddEstablishmentModule {
}
