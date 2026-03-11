import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload';

export const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent }
];
