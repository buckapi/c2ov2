import { Component, OnInit,Renderer2,ViewChild ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { OrderFromHome } from '@app/services/orderFromHome.service';
import { Yeoman } from '@app/services/yeoman.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
order:any;
  constructor(
    public orderFromHome: OrderFromHome,
    public yeoman:Yeoman,
    public dataApiService:DataApiService,
    public router:Router

  ) { 
    $('#main-wrapper').addClass("show menu-toggle");
    if (this.yeoman.previewOrder!==undefined){
    if (this.yeoman.previewOrder !== undefined) {
      this.order = JSON.stringify(this.yeoman.previewOrder);
    }
      
    }
    else {
      if (this.orderFromHome.order!==undefined){       
          this.yeoman.previewOrder = this.orderFromHome.order;
        }
    }
  }

  ngOnInit(): void {
  }

}
