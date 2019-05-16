import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import {MemeSubmitterComponent} from './meme-submitter/meme-submitter.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ExplorePageComponent} from './explore-page/explore-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'create', component: MemeSubmitterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
