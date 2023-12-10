import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FilePickerModule } from  'ngx-awesome-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TrimEndDirective } from './trim-end.directive';
import { TrimLastDirective } from './trim-last.directive';
import { UiModule } from './components/ui/ui.module';
import { HomeModule } from './components/home/home.module';
import { Router,RouterModule } from '@angular/router';
import { ExistenciaService } from './services/existencia-service.service';
import { Yeoman } from './services/yeoman.service';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
@NgModule({
  declarations: [
    AppComponent,
    TrimEndDirective,
    TrimLastDirective
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    FilePickerModule,
    NgxUsefulSwiperModule,
    LazyLoadImageModule,
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HomeModule,
    RouterModule
  ],
  providers: [FilePickerModule,ExistenciaService,Yeoman],
  exports:[
    HttpLinkModule,
    ApolloModule,
    FilePickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
