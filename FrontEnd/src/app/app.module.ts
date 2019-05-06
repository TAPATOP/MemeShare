import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MemeContainerComponent } from './meme-container/meme-container.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DomainSelectorComponent } from './domain-selector/domain-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeContainerComponent,
    HomePageComponent,
    DomainSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
