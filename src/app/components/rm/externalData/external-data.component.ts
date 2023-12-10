import { Component, OnInit } from '@angular/core';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { Yeoman } from '@app/services/yeoman.service';
import{NgxUiLoaderService} from 'ngx-ui-loader';
@Component({
  selector: 'app-external-data',
  templateUrl: './external-data.component.html',
  styleUrls: ['./external-data.component.css']
})
export class ExternalDataComponent implements OnInit {
  existencias: any[] = []; 
  p: number = 1;
  page: number = 1;
  count: number = 0;
  itemsPP:number=30;
  options: number[] = [30, 50, 100];
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    public yeoman:Yeoman,
    public existenciaService:ExistenciaService,
    private ngxService: NgxUiLoaderService 
    ) {
  this.obtenerExistencias(); 
  }
  changeItemsPerPage(value: number): void {
    this.itemsPP = value;
  }
  obtenerExistencias() {
    const familia = "%5Bobject+Object%5D";
    this.ngxService.start("loader-01");
    this.existenciaService.getAllExistencias(familia).subscribe(
      (data) => {
        this.existencias = data;      
        this.yeoman.existencias=null;
        this.yeoman.existencias=this.existencias;
        this.yeoman.existencias = this.yeoman.existencias.map((product:any, index:any) => {
          return { ...product, pos: index };
        });
        this.yeoman.existencias.reverse();
        this.ngxService.stop("loader-01");
        // Aquí puedes hacer algo con los datos obtenidos, como mostrarlos en el template.
      },
      (error) => {
        console.error('Error al obtener existencias:', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
