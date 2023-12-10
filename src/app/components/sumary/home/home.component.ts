import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public virtualRouter: virtualRouter,
    public global:GlobalService
  ) { }

  ngOnInit(): void {
  }

}
