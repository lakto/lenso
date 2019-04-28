import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: ':year/:month',
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
