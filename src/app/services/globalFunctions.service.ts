import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Butler } from "@services/butler.service";
import { Yeoman } from './yeoman.service';
import { DataApiService } from './data-api.service';
import { AuthRESTService } from '@services/authREST.service';
import { virtualRouter } from './virtualRouter.service';
@Injectable({
    providedIn: 'root'
  })
  export class Functions {
  clients:any;
    constructor(
        public butler:Butler,
        public virtuallRouter:virtualRouter,
        public yeoman:Yeoman,
        public dataApiService:DataApiService
    ) {  }

    setClient(i:any){
        this.yeoman.origin.restUrl=this.clients[i].RestUrl; //el mayordomo es informado de la nueva url REST 
        this.dataApiService.getAllProducts().subscribe(response => {
          this.yeoman.products=response;
          this.yeoman.products.reverse();
          this.yeoman.config.clientSelected=i;
          this.butler.virtualRoute="overview";
        });
    }
    signOut(){
      this.virtuallRouter.routerActive='login';    
    }   
  }