import {NgModule} from '@angular/core';

import {NavbarComponent} from './navbar.component';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';
import { EstablishmentsService } from 'src/app/rest/establishments/establishment.service';
import { AddEstablishmentFormModule } from '../../../../shared/components/add-establishment-form/add-establishment-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddEstablishmentFormModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [NavbarComponent],
  providers: [EstablishmentsService],
})
export class NavbarModule {
}
