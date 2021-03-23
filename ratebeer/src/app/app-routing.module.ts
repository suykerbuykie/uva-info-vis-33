import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer-component/beer.component';
import { AppComponent } from './app.component';
import { BeerExplorerComponent } from './beer-explorer/beer-explorer.component';

const routes: Routes = [
	{ path: 'beers', component: BeerComponent },
	{ path: 'beer-explorer', component: BeerExplorerComponent },
	{ path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
