import {NgModule} from '@angular/core';

import {NavbarComponent} from './navbar.component';
import {CommonModule} from "@angular/common";
import { RouterModule } from '@angular/router';
import { EstablishmentsService } from 'src/app/rest/reasturants-list/establishment.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [NavbarComponent],
  providers: [EstablishmentsService],
})
export class NavbarModule {
}
