import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    RouterLink,
  ],
  exports: [
    FooterComponent,
  ],
  declarations: [ FooterComponent ],
  providers: [],
})
export class FooterModule {}
