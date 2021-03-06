import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MemeContainerComponent } from './meme-container/meme-container.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DomainSelectorComponent } from './domain-selector/domain-selector.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MemePerPageComponent } from './meme-per-page/meme-per-page.component';
import { FilterComponent } from './filter/filter.component';
import { MemeCreatorComponent } from './meme-submitters/meme-creator/meme-creator.component';
import { NavComponent } from './nav/nav.component';
import {AppRoutingModule} from './app-routing.module';
import {ExplorePageComponent} from './explore-page/explore-page.component';
import {MemeEditorComponent} from './meme-submitters/meme-editor/meme-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeContainerComponent,
    HomePageComponent,
    DomainSelectorComponent,
    PaginatorComponent,
    MemePerPageComponent,
    FilterComponent,
    MemeCreatorComponent,
    NavComponent,
    ExplorePageComponent,
    MemeEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
