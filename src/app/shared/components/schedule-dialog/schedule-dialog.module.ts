import {NgModule} from '@angular/core';

import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCommonModule, MatNativeDateModule} from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { ScheduleDialogComponent } from './schedule-dialog.component';

@NgModule({
  imports:
    [
      MatDialogModule,
      MatButtonModule,
      MatCommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      CommonModule,
      MatNativeDateModule,
      FormsModule,
      MatIconModule,
    ],
  exports: [ScheduleDialogComponent],
  declarations: [ScheduleDialogComponent],
})
export class ScheduleDialogModule {}
