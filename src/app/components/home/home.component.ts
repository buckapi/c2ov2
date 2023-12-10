import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ScriptService } from '@app/services/script.service';
import { Yeoman } from '@app/services/yeoman.service';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { DataApiService } from '@app/services/data-api.service';
import { HttpClient } from '@angular/common/http';
import { tap, count, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { Butler } from '@app/services/butler.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { merge } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { OrderFromHome } from '@app/services/orderFromHome.service';
import { Catalogo } from '@app/services/catalogo.service';

import { DeviceDetectorService } from 'ngx-device-detector'
import { virtualRouter } from '@app/services/virtualRouter.service';
declare const XM_Popup: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  distName: string = '';
  @ViewChild('mainWrapper', { static: true }) mainWrapper!: ElementRef;
  countDev: number = 0;
  currentUser: any;
  clientDetail: { clrepresentante: any }[] = [];
  existencias: any[] = [];
  all: any[] = [];
  existenciasSize: number = 0;
  dists: any;
  allSize: number = 0;
  artSizes: any[][] = [];
  catSizes: any[][] = [];
  cliSizes: any[][] = [];
  sizes: any[][] = [];
  developerMode: boolean = false;
  combinedData: any[] = [];
  totalArticulos: { [distId: string]: number } = {};
  totalCategorias: { [distId: string]: number } = {};
  totalClientes: { [distId: string]: number } = {};
  clientesSize: number = 0;
  ordersSize = 0;

  constructor(
    public virtualRouter: virtualRouter,
    private deviceService: DeviceDetectorService,
    public catalogo: Catalogo,
    public orderFromHome: OrderFromHome,
    private cdr: ChangeDetectorRef,
    public existenciaService: ExistenciaService,
    public router: Router,
    public http: HttpClient,
    public authRESTService: AuthRESTService,
    public script: ScriptService,
    public yeoman: Yeoman,
    public _butler: Butler,
    public dataApiService: DataApiService
  ) {
    this.script.load(
      'swiper',
      'custom-swiper',
      'feather',
      'custom-feather',
      'iconsax',
      'bootstrap',
      'homescreen-popup',
      'offcanvas-popup',
      'script',
    )
      .then(() => {
        console.log('Todos los scripts se cargaron correctamente');
      })
      .catch(error => console.log(error));



    this._butler.userActive = this.authRESTService.getCurrentUser();
    this.yeoman.type = localStorage.getItem('type');
    this.countDev = 0;
    $('#main-wrapper').removeClass(" menu-toggle");
    if (this.yeoman.type === "admin") {
      this.loadDists();
    }
    if (this.yeoman.type === "dist") {
      this.findDist();
    }
    if (this.yeoman.type === "client") {
      this.findClient();
    }
    const userStr: any = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(userStr);
    if (!this.authRESTService.getCurrentUser()) {
      // this.router.navigate(['/login'])
    }
  }
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

salir(){
  this.virtualRouter.routerActive="login";
}
  calcularTotales(): void {
    for (const dist of this.dists) {
      this.dataApiService.getArticulos(dist.url)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(articulos => {
          this.totalArticulos[dist.id] = articulos.length;
        });

      this.dataApiService.getCategories(dist.url)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(categorias => {
          this.yeoman.categories = categorias;
          this.totalCategorias[dist.id] = categorias.length;
        });
      this.dataApiService.getClientes(dist.url)
        .pipe(
          catchError(error => {
            return of([]);
          })
        )
        .subscribe(clientes => {
          this.totalClientes[dist.id] = clientes.length;
        });
    }
  }
  goToAddOrder() {
    this.router.navigate(['/addOrder']);
  }
  formatDateRelative(createdAt: string): string {
    const date = new Date(createdAt);
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  }
  deleteAllRecords() {
    this.dataApiService.getAllOrders()
      .pipe(
        switchMap((orders) => {
          if (!Array.isArray(orders)) {
            orders = [];
          }
          const deleteObservables: Observable<void>[] = (orders as any[]).map((order: any) => {
            return this.dataApiService.deleteOrder(order.id);
          });
          return merge(...deleteObservables);
        })
      )
      .subscribe(() => {
      });
  }
  deleteAllClients() {
    this.dataApiService.getClients()
      .pipe(
        switchMap((clients) => {
          if (!Array.isArray(clients)) {
            clients = [];
          }
          const deleteObservables: Observable<void>[] = (clients as any[]).map((client: any) => {
            return this.dataApiService.deleteClient(client.id);
          });
          return merge(...deleteObservables);
        })
      )
      .subscribe(() => {
      });
  }
  obtenerArticulos(url: any) {
    this.dataApiService.getArticulos(url).subscribe(articulos => {
      this.yeoman.existenciasSize = articulos.length;
    });
  }
  setPreviewOrder(i: any) {
    this.yeoman.previewOrder = this.yeoman.myOrders[i];
    this.orderFromHome.order = this.yeoman.myOrders[i];

    this.router.navigate(['/orderDetail']);
  }
  findDist() {
    this.dataApiService.getDistBy('d' + localStorage.getItem('userId')).subscribe((res: any) => {
      this.yeoman.dist = res[0];
      localStorage.setItem('dist', JSON.stringify(res[0]));
      let distString = localStorage.getItem('dist');
      if (distString !== null) {
        let dist = JSON.parse(distString);
        this.obtenerArticulos(dist.url);
        this.dataApiService.getClientes(dist.url).subscribe(response => {
          this.yeoman.clientes = response;
          this.clientesSize = this.yeoman.clientes.length;
          this.getOrdersByDist();
        });
      }
    });
  }
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
  getOrdersByDist() {
    let distString = localStorage.getItem('dist');
    if (distString !== null) {
      let dist = JSON.parse(distString);
      this.dataApiService.getOrdersByDist('d' + dist.id).subscribe(response => {
        const tempOrders = response; this.yeoman.myOrders = tempOrders;
        this.yeoman.myOrders = this.yeoman.myOrders.reverse();
        this.classifyOrders();
        this.ordersSize = this.yeoman.myOrders.length;
        // this.findDist2(this.yeoman.idDist);
      })
    }
  }
  obtenerFichaCliente() {
    let clientFichaString = localStorage.getItem('clientFicha');
    if (clientFichaString !== null) {
      let clienteFicha = JSON.parse(clientFichaString);
      this.yeoman.clientFicha = clienteFicha;
    }
  }
  getClientDetail(url: any, cliCodigo: any) {
    this.dataApiService.getCliente(url, cliCodigo).subscribe((res: any) => {
      this.clientDetail = res[0];
      localStorage.setItem('clientFicha', JSON.stringify(res));
      this.obtenerFichaCliente();
    });
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
  loadSizes() {
    for (let i = 0; i < this.dists.length; i++) {
      this.totalArt(i).subscribe(count => {
        this.sizes[0][i] = count;
      });
      this.totalCat(i).subscribe(count => {
        this.sizes[1][i] = count;
      });
      this.totalCli(i).subscribe(count => {
        this.sizes[2][i] = count;
      });
    }
  }
  setDeveloperMode() {
    if (this.countDev > 5 && !this.developerMode) {
      this.developerMode = !this.developerMode;
    } else {
      this.countDev++;
    }
  }
  totalArt(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(
        map(response => response.length)
      );
    } else {
      return new Observable<number>();
    }
  }
  totalCat(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(

        map(response => response.length)
      );
    } else {
      return new Observable<number>();
    }
  }
  totalCli(i: any): Observable<number> {
    if (this.combinedData && Array.isArray(this.combinedData) && this.combinedData[i] && this.combinedData[i].url) {
      return this.http.get<any[]>(this.combinedData[i].url).pipe(
        map(response => response.length)
      );
    } else {
      return new Observable<number>();
    }
  }
  obtenerExistencias() {
    const familia = "%5Bobject+Object%5D";
    if (this.yeoman.dist !== undefined) {
      const url = this.yeoman.dist.url;
      this.existenciaService.getAllExistencias(url).subscribe(
        (data) => {
          this.existencias = data;
          this.yeoman.existencias = null;
          this.yeoman.existencias = this.existencias;
          this.yeoman.existenciasSize = this.existencias.length;
        }
      );
    }
  }
  loadDists() {
    this.dataApiService.getAllDists().subscribe(response => {
      this.dists = response;
      this.calcularTotales();
      this.loadSizes();
    });
  }

  setPreview(i: any) {
    this.yeoman.previewOrder = this.yeoman.myOrders[i]
    this.router.navigate(['/orderDetail']);
  }
  setPreviewNew(i: any) {
    this.yeoman.previewOrder = this.yeoman.ordersNew[i]
    this.router.navigate(['/orderDetail']);
  }

  setPreviewPro(i: any) {
    this.yeoman.previewOrder = this.yeoman.ordersProcessing[i]
    this.router.navigate(['/orderDetail']);
  }
  setPreviewFin(i: any) {
    this.yeoman.previewOrder = this.yeoman.ordersFinished[i]
    this.router.navigate(['/orderDetail']);
  }

  ngOnInit(): void {

    // this.epicFunction();
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
    this.cdr.detectChanges();
  }

  statusClientRequest(client: any) {
    this.dataApiService.getClientBy(client).subscribe((res: any) => {
      let status = res[0].status;
      if (status === 'active') {
      }
      else if (status === 'unavailable') {
        this.router.navigate(['/unavailable']);
      }
    });

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
            this.router.navigate(['/unavailable']);
          }
        }
      });
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
                this.cdr.detectChanges();
                this.dataApiService.getCategories(dist.url)
                  .pipe(
                    catchError(error => {
                      return of([]);
                    })
                  )
                  .subscribe(categorias => {

                    this.yeoman.categories = categorias;
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
}
