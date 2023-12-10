import { Component, OnInit } from '@angular/core';
import { Yeoman } from '@app/services/yeoman.service';
import { DataApiService } from '@app/services/data-api.service';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import{NgxUiLoaderService} from 'ngx-ui-loader';
@Component({
  selector: 'app-dists',
  templateUrl: './dists.component.html',
  styleUrls: ['./dists.component.css']
})
export class DistsComponent implements OnInit {
message='';
developerMode:boolean=false;
counterDeveloperMode:number=0;
  constructor(
    private ngxService: NgxUiLoaderService,
    public router:Router,
    public authRESTService:AuthRESTService,
    public yeoman:Yeoman,
    public dataApiService:DataApiService
  ) { 
    this.getAll();
    }
    getAll(){
      this.ngxService.start("loader-01");
      this.dataApiService.getAllDists().subscribe(
        response => {
          this.yeoman.all = response;

          if(this.yeoman.all.length===0){
            this.message="No hay distribuidores registrados";
          }
          this.ngxService.stop("loader-01");
        }
      );
      
    }
 
    setPreview(i:any){
      this.yeoman.preview=this.yeoman.all[i];
      this.yeoman.previewType="dist";
      this.yeoman.indexPreviewDist=i;
      this.router.navigate(['distDetail']);
    }
    ngOnInit(): void {
    }

}


