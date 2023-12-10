import { Injectable } from '@angular/core';
import { Butler } from "@services/butler.service";
import { Yeoman } from './yeoman.service';
import { DataApiService } from './data-api.service';
import { virtualRouter } from './virtualRouter.service';
import { AuthRESTService } from './authREST.service';
import { Catalogo } from './catalogo.service';
import { tap, count, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  clients: any;
  deviceType: string = "";
  currentUser:any;
  ordersSize = 0;
  clientDetail: { clrepresentante: any }[] = [];
  constructor(
    public catalogo: Catalogo,
      public authRESTService: AuthRESTService,
      public butler: Butler,
      public http: HttpClient,
      public virtuallRouter: virtualRouter,
      public yeoman: Yeoman,
      public dataApiService: DataApiService
  ) { }
  getOrdersByClient() {
    let clientString = localStorage.getItem('clientCard');
    if (clientString !== null) {
      let clientCard = JSON.parse(clientString);
      this.dataApiService.getOrdersByClient(clientCard.idUser).subscribe(response => {
        const tempOrders = response; this.yeoman.myOrders = tempOrders;
        this.yeoman.myOrders = this.yeoman.myOrders.reverse();
        this.classifyOrders();
        this.ordersSize = this.yeoman.myOrders.length;
      })
    }
  }
  classifyOrders() {
    this.yeoman.ordersNew = [];
    this.yeoman.ordersProcessing = [];
    this.yeoman.ordersFinished = [];
    for (const order of this.yeoman.myOrders) {
      if (order.status === 'nueva') {
        this.yeoman.ordersNew.push(order);
      } else if (order.status === 'procesando') {
        this.yeoman.ordersProcessing.push(order);
      } else if (order.status === 'terminada') {
        this.yeoman.ordersFinished.push(order);
      }
    }
    // this.cdr.detectChanges();
  }
  findClient() {
    const idFind = this.authRESTService.getCurrentUser().id;
    if (idFind !== undefined) {
      this.dataApiService.getClientBy(idFind).subscribe((res: any) => {
        localStorage.setItem('clientCard', JSON.stringify(res[0]));
        let clientString = localStorage.getItem('clientCard');
        if (clientString !== null) {
          let clientCard = JSON.parse(clientString);
          if (clientCard.status == "active") {
            const idClient = clientCard.idUser;
            const idDist = clientCard.ref;
            this.yeoman.idClient = idClient;
            this.yeoman.client = clientCard;
            this.yeoman.clientEmail = clientCard.email;
            this.yeoman.idDist = idDist;
            this.getOrdersByClient();
            this.findDist2(clientCard.ref);
          } else {
            // this.router.navigate(['/unavailable']);
          }
        }
      });
    }
  }
  ClientFicha(): any {
    let client_string = localStorage.getItem("clientFicha");
	    if (client_string ) {
		      let client: any = JSON.parse(client_string!);
		      return client;
		    } else { 
		      return null!;
			}
  		}
      type(): string | null {
        const typeString = localStorage.getItem("type");
        if (typeString) {
            try {
                return typeString;
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
                return null;
            }
        }
        return null;
    }
  getClientDetail(url: any, cliCodigo: any) {
    this.dataApiService.getCliente(url, cliCodigo).subscribe((res: any) => {
      this.clientDetail = res[0];
      localStorage.setItem('clientFicha', JSON.stringify(res));
      this.obtenerFichaCliente();
    });
  }
  obtenerFichaCliente() {
    let clientFichaString = localStorage.getItem('clientFicha');
    if (clientFichaString !== null) {
      let clienteFicha = JSON.parse(clientFichaString);
      this.yeoman.clientFicha = clienteFicha;
    }
  }
  findDist2(ref: any) {
    this.dataApiService.getDistByIdDist(ref).subscribe((res: any) => {
      this.yeoman.dist = res[0];
      localStorage.setItem('dist', JSON.stringify(res[0]));
      this.yeoman.dist = res[0];
      if (res[0] !== undefined) {
        this.yeoman.distName = res[0].name;
        const url = this.yeoman.dist.url;
        let distString = localStorage.getItem('clientCard');
        if (distString !== null) {
          let clientCard = JSON.parse(distString);
          const cliCodigo = clientCard.cliCodigo;
          this.getClientDetail(url, clientCard.cliCodigo);
        }
        if (this.yeoman.client !== undefined) {
          let distString = localStorage.getItem('dist');
          if (distString !== null) {
            let dist = JSON.parse(distString);
            const parametros = 'clcodigo=' + this.yeoman.client.cliCodigo;
            const endpoint = 'webapi/articulos/getcatalogo';
            const consultaUrl = dist.url + endpoint + '?' + parametros;
            this.dataApiService.getCatalogo(consultaUrl)
              .subscribe(data => {
                this.catalogo.catalogo = data;
                this.yeoman.catalogoCargado = true;
                // this.cdr.detectChanges();
                this.dataApiService.getCategories(dist.url)
                  .pipe(
                    catchError(error => {
                      return of([]);
                    })
                  )
                  .subscribe(categorias => {

                    // this.yeoman.categories = categori
                  });


              });
            this.http.get<any[]>(consultaUrl)
              .subscribe(data => {
              });
          }
        }
      }
    });
  }



  setClient(i:any){
        this.yeoman.origin.restUrl=this.clients[i].RestUrl; 
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
