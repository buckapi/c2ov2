import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { Butler } from '@app/services/butler.service';
import { Yeoman } from '@app/services/yeoman.service';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { DataApiService } from '@app/services/data-api.service';

import Swal from 'sweetalert2'
import { Search } from '@services/search.service';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  user: any;
  order: any = { idClient: '', idDist: '', order: [], total: '', totalArticulos: '' };
  showFirstImage = true;
  constructor(
    public search:Search,
    public authRESTService: AuthRESTService,
    public router: Router,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    public script: ScriptService
  ) {
    this.yeoman.user = this.authRESTService.getCurrentUser();
    this.script.load(
      '',
    )
      .then(data => {
      })
      .catch(error => console.log(error));
  }
  toggleImage() {
    this.showFirstImage = !this.showFirstImage;
  }
  filter(i:any){
    let categoySelected= this.yeoman.categories[i];
    this.yeoman.categorySelected=categoySelected.facodigo;
    this.yeoman.filtered=true;

  }
  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.search.check=true;
      console.log('Checkbox 4 está marcado');
      // Realiza acciones cuando se marca el checkbox
    } else {

      this.search.check=false;
      console.log('Checkbox 4 está desmarcado');
      // Realiza acciones cuando se desmarca el checkbox
    }
  }

  
  
  
  
  onSearch(event: any) {
    const valorInput = event.target.value;
    this.search.articulo=valorInput;
    this.search.articuloFiltered=true;
  }
  onSearchCliente(event: any) {
    const valorInput = event.target.value;
    this.search.cliente=valorInput;
    this.search.clienteFiltered=true;
  }
showAll(){
  this.yeoman.filtered=false;
}
  onLogOut() {
    this.authRESTService.logoutUser();
    this.yeoman.reset();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }
  changeView(){
    this.yeoman.viewSelected=!this.yeoman.viewSelected;
  }
  goBack(){
    this.yeoman.go=true;
    this.yeoman.goMessage="redireccionando, por favor espere ";
    setTimeout(() => {
      this.router.navigate(['addOrder']);
    }, 500);  }
  procesar() {
    this.order.idClient = this.yeoman.idClient;
    this.order.idDist = this.yeoman.idDist;
    this.order.order = this.yeoman.neworder;
    this.order.status = 'nueva';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.order.ref = randomLetter + randomDigits;
    this.order.clientEmail = this.yeoman.clientEmail;
    this.order.totalIVA= this.yeoman.totalIVA;
    this.order.total = this.yeoman.totalOrder;
    this.order.totalArticulos = this.yeoman.neworder.length - 1;
    this.dataApiService.saveOrder(this.order).subscribe(response => {
      console.log(response);
      this.yeoman.neworder = [];
      this.yeoman.totalOrder = 0;
      this.yeoman.orderSize = 0;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Orden enviada',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['']);
    }
    );
  }
}
