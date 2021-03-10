import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer-component/beer.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: '', component: AppComponent },
	{ path: 'beers', component: BeerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
