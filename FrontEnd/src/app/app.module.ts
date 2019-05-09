import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MemeContainerComponent } from './meme-container/meme-container.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DomainSelectorComponent } from './domain-selector/domain-selector.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MemePerPageComponent } from './meme-per-page/meme-per-page.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MemeContainerComponent,
    HomePageComponent,
    DomainSelectorComponent,
    PaginatorComponent,
    MemePerPageComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
