import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { Yeoman } from '@app/services/yeoman.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    LazyLoadImageModule,
    NgxUsefulSwiperModule,
    CommonModule,
    HomeRoutingModule
  ],exports:[HomeComponent],providers:[
    Yeoman
  ]
})
export class HomeModule { }
