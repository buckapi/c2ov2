import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Butler } from '@app/services/butler.service';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-dez-nav',
  templateUrl: './dez-nav.component.html',
  styleUrls: ['./dez-nav.component.css']
})
export class DezNavComponent implements OnInit {
  currentUser: any;
  constructor( 
    public router:Router,
    public script:ScriptService,
    public _butler:Butler,
    public yeoman:Yeoman
    ) {
       const userStr:any = localStorage.getItem('currentUser');
       this.currentUser = JSON.parse(userStr);
     }
     esAdmin(): boolean {
      return this.currentUser && this.currentUser.type === 'admin';
    }
    esClient(): boolean {
      return this.currentUser && this.currentUser.type === 'client';
    }
    esDist(): boolean {
      return this.currentUser && this.currentUser.type === 'dist';
    }
  ngOnInit(): void {
  }

}
