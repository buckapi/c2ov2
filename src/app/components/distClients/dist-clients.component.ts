import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import { Search } from '@app/services/search.service';
import { Yeoman } from '@app/services/yeoman.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-dist-clients',
  templateUrl: './dist-clients.component.html',
  styleUrls: ['./dist-clients.component.css']
})
export class DistClientsComponent implements OnInit {
  clientes: any[] = [];
  cliSelected: any;
  
  constructor(
    public search:Search,
    private ngxService: NgxUiLoaderService,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    public butler: Butler
  ) {
    this.loadClientes();
  }

  ngOnInit(): void {
  }
  loadClientes() {
    this.yeoman.clientes=[];
    let distString = localStorage.getItem('dist');
    if (distString !== null) {
      let dist = JSON.parse(distString);
      this.dataApiService.getClientes(dist.url).subscribe(response => {
        this.clientes = response;
        this.yeoman.clientes = response;
        this.loadClients();
      });
    }

  }
  loadClients() {
    this.ngxService.start("loader-02");
    this.dataApiService.getClients().subscribe(response => {
      this.yeoman.clients = response;
      console.log(response);
      this.ngxService.stop("loader-02");
      this.comparar();

    });
  };
  selectCli(client: any) {
    this.cliSelected = true;
    this.yeoman.cliSelected = client;
    console.log("cLIENTEEEEEEE: " + JSON.stringify(this.yeoman.cliSelected));
  }

  suspend(clienteParametro: any) {
    let cliente = clienteParametro;
  console.log("cliente id USER: "+clienteParametro);
    // Buscar el cliente correspondiente en yeoman.clients
    const yeomanClient = this.yeoman.clients.find(
      (client: any) => client.cliCodigo === cliente.clcodigo
    );
  
    if (yeomanClient) {
      // Cambiar el estado del cliente en yeoman.clients a "unavailable"
      yeomanClient.status = "unavailable";
      
      // Actualizar el estado en el servidor
      this.dataApiService.clientUpdate(yeomanClient, yeomanClient.id).subscribe(
        (response) => {
          this.loadClientes();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Acceso suspendido',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          console.error('Error al suspender el cliente:', error);
        }
      );
    } else {
      console.warn('Cliente no encontrado en yeoman.clients');
    }
  }
  reactivate(clienteParametro: any) {
    let cliente = clienteParametro;
  
    // Buscar el cliente correspondiente en yeoman.clients
    const yeomanClient = this.yeoman.clients.find(
      (client: any) => client.cliCodigo === cliente.clcodigo
    );
  
    if (yeomanClient) {
      // Cambiar el estado del cliente en yeoman.clients a "active"
      yeomanClient.status = "active";
  
      // Actualizar el estado en el servidor
      this.dataApiService.clientUpdate(yeomanClient, yeomanClient.id).subscribe(
        (response) => {
          this.loadClientes();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Acceso reactivado',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          console.error('Error al reactivar el cliente:', error);
        }
      );
    } else {
      console.warn('Cliente no encontrado en yeoman.clients');
    }
  }
  

  comparar() {
    for (let i = 0; i < this.clientes.length; i++) {
      for (let j = 0; j < this.yeoman.clients.length; j++) {
        if ((this.clientes[i].clcodigo === this.yeoman.clients[j].cliCodigo) && this.yeoman.clients[j].status === "active") {
          this.clientes[i].status = "active";
          this.clientes[i].clientEmail= this.yeoman.clients[j].email;

          this.clientes[i].idUser= this.yeoman.clients[j].idUser;

          this.clientes[i].clientId= this.yeoman.clients[j].id;
          console.log("codigo conseguido: " + this.clientes[i].clcodigo);
          i++;
        }
        else {
          if (this.clientes[i].clcodigo === this.yeoman.clients[j].cliCodigo  ){
            this.clientes[i].status = "unavailable";
          }        
        }
      }
    }
     this.ordenarAscendente(this.clientes);
  }

  ordenarAscendente(items: any) {
    items.sort((a: any, b: any) => a.clnombre.localeCompare(b.clnombre));
    this.clientes = items;
    this.yeoman.clientes = items;
  }
}
