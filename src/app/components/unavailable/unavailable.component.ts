import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.css']
})
export class UnavailableComponent implements OnInit {

  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  constructor(
    public yeoman:Yeoman
  ) { 

    $('#main-wrapper').addClass("show menu-toggle");

  }

  ngOnInit(): void {
  }

}
