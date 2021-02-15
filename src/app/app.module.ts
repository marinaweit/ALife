import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor } from './interceptors';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, ComponentsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
