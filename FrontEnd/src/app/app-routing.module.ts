import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import {MemeContainerComponent} from './meme-container/meme-container.component';
import {MemeSubmitterComponent} from './meme-submitter/meme-submitter.component';

const routes: Routes = [
  { path: 'explore', component: MemeContainerComponent },
  { path: 'create', component: MemeSubmitterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
