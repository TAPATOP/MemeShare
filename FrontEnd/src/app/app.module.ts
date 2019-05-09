import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MemeContainerComponent } from './meme-container/meme-container.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DomainSelectorComponent } from './domain-selector/domain-selector.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MemePerPageComponent } from './meme-per-page/meme-per-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeContainerComponent,
    HomePageComponent,
    DomainSelectorComponent,
    PaginatorComponent,
    MemePerPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
