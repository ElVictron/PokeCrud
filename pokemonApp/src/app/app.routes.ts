import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetailsPage } from './home/page - details/details.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'details/:name',
    component: DetailsPage,
  },
];
