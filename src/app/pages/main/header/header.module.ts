import {NgModule} from '@angular/core';

import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { NavbarModule } from './navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent],
  providers: [],
})
export class HeaderModule {}
