import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SafePipe,
  ],
  declarations: [
    SafePipe,
  ],
  providers: [],
})
export class PipesModule {}
