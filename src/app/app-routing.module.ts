import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule),
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
