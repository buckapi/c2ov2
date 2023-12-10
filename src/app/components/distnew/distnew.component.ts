import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { UploaderCaptions } from 'ngx-awesome-uploader';

import { Yeoman } from '@services/yeoman.service';

import { DemoFilePickerAdapter } from '@app/file-picker.adapter';
import { HttpClient } from '@angular/common/http';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
@Component({
  selector: 'app-distnew',
  templateUrl: './distnew.component.html',
  styleUrls: ['./distnew.component.css']
})
export class DistnewComponent implements AfterViewInit {
  @ViewChild('deleteSwal') deleteSwalRef!: ElementRef;
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;

  categories: any;
  catSize: any;
  articulos: any;
  artSize: any;
  clientes: any;
  cliSize: any;
  get completeURL(): string {
    return this.data2.url + ':' + this.data2.port.toString() + '/';
  }
  products$: any = {};
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágen de perfil',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  data2 = {
    name: '',
    address: '',
    url: 'https://',
    port: 0,
  };
  data = {
    images: [
      'assets/gymove/images/product/1.jpg'
    ],
    name: '',
    address: '',
    ref: '',
    email: '',
    password: '',
    idUser: '',
    type: '',
    url: ''
  };
  branchOptions = [
    {
      name: 'Accesorios',
      images: ['assets/assetsdash/images/profile/profile.png'],
      idBranch: 'ca000001'
    },
    {
      name: 'Herramientas',
      images: ['assets/assetsdash/images/profile/profile.png'],
      idBranch: 'ca000002'
    },
    {
      name: 'Hogar',
      images: ['assets/assetsdash/images/profile/profile.png'],
      idBranch: 'ca000003'
    },
    {
      name: 'Tecnología',
      images: ['assets/assetsdash/images/profile/profile.png'],
      idBranch: 'ca000004'
    }
  ];
  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  testing: boolean[] = [false, false, false]; // Inicialización con valores true
  tested: boolean = false;
  steep: any = 0;
  constructor(
    private cdr: ChangeDetectorRef,
    public router: Router,
    public http: HttpClient,
    public _butler: Butler,
    public authRESTService: AuthRESTService,
    public dataApiService: DataApiService
  ) {
    this.regeneratePassword();
    this._butler.data = this.data;
  }
  next(i: any) {
    this.steep = i;
  }
  prev(i: any) {
    this.steep = i;
  }
  copyToClipboard() {
    const passwordInputElement = this.passwordInputRef.nativeElement;
    passwordInputElement.select();
    document.execCommand('copy');
  }
  regeneratePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const passwordLength = 12; // Aumenta la longitud de la contraseña
    let newPassword = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    this.data.password = newPassword;
  }
  registrarUsuario() {
    this.authRESTService.registerUser(this.data.email, this.data.password, 'dist').subscribe(
      response => {
        if (response && response.id) {
          const userId = response.id;
          this.data.idUser = userId;
          this.data.type = 'dist';
          
          this.onSubmit();
          this.router.navigate(['dists']);
        }
      }
    );
  }



  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    if (this._butler.uploaderImages[0] !== undefined) {
      this.data.images = this._butler.uploaderImages;
    }
    this.data.idUser='d'+this.data.idUser;
    this.data.url = this.completeURL;
    this.dataApiService.saveDist(this.data).subscribe(response => {
      this._butler.uploaderImages = [];
      this.router.navigate(['dists']);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Información guardada',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  test() {
    this.tested = true;
    this.testing[0] = true;
    this.testing[1] = true;
    this.testing[2] = true;
    this.dataApiService.getArticulos(this.completeURL).subscribe(
      data => {
        this.articulos = data;
        this.artSize = this.articulos.length;
        this.testing[0] = false;
      },
      error => {
        this.testing[0] = false;
        this.artSize = 0;
      }
    );

    this.dataApiService.getCategories(this.completeURL).subscribe(
      data => {
        this.categories = data;
        this.catSize = this.categories.length;
        this.testing[1] = false;
      },
      error => {
        this.testing[1] = false;
        this.catSize = 0;
      }
    );

    this.dataApiService.getClientes(this.completeURL).subscribe(
      data => {
        this.clientes = data;
        this.cliSize = this.clientes.length;
        this.testing[2] = false;
      },
      error => {
        this.testing[2] = false;
        this.cliSize = 0;
      }
    );

    console.log(this.completeURL);

  }
  reset() {
    this.tested = false;
    this.testing[0] = false;
    this.testing[1] = false;
    this.testing[2] = false;

  }
  ngAfterViewInit(): void {
  }

}
