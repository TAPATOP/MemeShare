import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import {MemeCreatorComponent} from './meme-submitters/meme-creator/meme-creator.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ExplorePageComponent} from './explore-page/explore-page.component';
import {MemeEditorComponent} from './meme-submitters/meme-updater/meme-editor.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'create', component: MemeCreatorComponent },
  { path: 'edit', component: MemeEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
