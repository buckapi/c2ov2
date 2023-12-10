import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { Yeoman } from './services/yeoman.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './services/data-api.service';
import { DemoFilePickerAdapter } from './file-picker.adapter';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import Swal from 'sweetalert2'
import { CATEGORIES } from '@app/services/categories.service';
import { Router } from '@angular/router';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { AuthRESTService } from './services/authREST.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GlobalService } from './services/global.service';
declare const XM_Popup: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
  @ViewChild('passwordInput') passwordInputRef!: ElementRef;
  @ViewChild('passwordInput2') passwordInputRef2!: ElementRef;
  existencias: any[] = [];
  existenciasSize: number = 0;
  @ViewChild('deleteSwal')
  categories: any;
  popup: any;
  popupStyle = {
    position: 'absolute',
    left: '50%',
    zIndex: '100001',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translate(0px, -40px)',
    transition: 'transform 0.3s ease-in-out 0s, opacity 0.3s ease-in-out 0s, visibility 0.3s ease-in-out 0s',
    top: '0px',
    marginLeft: '-492px'
  };

  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del producto',
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
  data = {
    images: [] as string[], 
    name: '',
    description: '',
    price: null,
    stock: 0,
    ref: '',
    idBranch: ''
  };
  dataArticulo = {
    images: [] as string[], 
    name: '',
    description: '',
    price: null,
    cantidad: 0,
    stock: 0,
    ref: '',
    idBranch: ''
  };
  dataCli = {
    images: [
      'assets/gymove/images/product/1.jpg'
    ],
    cliCodigo: '',
    name: '',
    address: '',
    ref: '',
    email: '',
    password: '',
    idUser: '',
    type: '',
    idDist: '',
    status: '',
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

  runButtonClicked() {
    this.popupStyle.opacity = '1';
    this.popupStyle.visibility = 'hidden';
  }
  closePopup() {
  }
  ngOnInit(): void {
    
    this.epicFunction();
  }
  public getProducts() {
    this.dataApiService.getAllProducts().subscribe(response => {
      this.yeoman.products = response;
      this.yeoman.products.reverse();
    });
  }
  regeneratePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const passwordLength = 12; 
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    this.dataCli.password = newPassword;
  }


  copyToClipboard() {
    const passwordInputElement = this.passwordInputRef.nativeElement;
    passwordInputElement.select();
    document.execCommand('copy');
  }
  copyToClipboard2() {
    const passwordInputElement = this.passwordInputRef2.nativeElement;
    passwordInputElement.select();
    document.execCommand('copy');
  }
  onSubmitt() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.carImages;
    this.dataApiService.saveProduct(this.data).subscribe(response => {
      console.log(response);
      this._butler.carImages = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getProducts();
    });
    console.log(this.data);
  }
  products$: any = {};
  title = 'vk';
  adapter = new DemoFilePickerAdapter(this.http, this._butler);

  deviceInfo: any = null
  constructor(

    private deviceService: DeviceDetectorService,
    public existenciaService: ExistenciaService,
    private http: HttpClient,
    public router: Router,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    public authRESTService: AuthRESTService,
    public script: ScriptService,
    private renderer: Renderer2, private el: ElementRef,
    public global: GlobalService
  ) {

    this.epicFunction();
    this.regeneratePassword();
    this.yeoman.user = this.authRESTService.getCurrentUser();
    this._butler.data = this.data;
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
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile) {
      this.global.deviceType = "Mobile";
      console.log("Mobile");
      //  this.global.grid=false;
      //  this.global.list=true;
    };
    if (isTablet) {
      this.global.deviceType = "Tablet";
      //  this.global.grid=false;
      //  this.global.list=false
    };
    if (isDesktopDevice) {
      this.global.deviceType = "Desktop";
      console.log("Desktop");
      // this.global.grid=true;
      // this.global.list=false
    };

  }
  obtenerExistencias() {
    const familia = "%5Bobject+Object%5D";
    const url = this.yeoman.dist.ur;
    this.existenciaService.getAllExistencias(url).subscribe(
      (data) => {
        this.existencias = data;
        this.yeoman.existencias = null;
        this.yeoman.existencias = this.existencias;
        this.yeoman.existenciasSize = this.existencias.length;
      },
      (error) => {
        console.error('Error al obtener existencias:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    
  }
  onSubmitClient() {
    let distString = localStorage.getItem('dist');
    if (distString !== null) {
      let dist = JSON.parse(distString);
      this.dataCli.ref = (Math.floor(Math.random() * 10000000000000)).toString();
      this.dataCli.idUser = 'c' + this.dataCli.idUser;
      this.dataCli.idDist = 'd' + dist.id;
      this.dataCli.ref = dist.ref;
      this.dataCli.status = 'active';
      this.dataCli.cliCodigo = this.yeoman.cliSelected.clcodigo;
      this.dataApiService.saveClient(this.dataCli).subscribe(response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Acceso activado',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadClients();
      });
    }
    console.log(this.dataCli);
  }
  removerClaseModalOpen() {
    const element = this.el.nativeElement.ownerDocument.querySelector('#aAddDietMenus');
    const element2 = this.el.nativeElement.ownerDocument.body;
    if (element) {
      this.renderer.removeClass(element2, 'modal-open');
      this.renderer.removeClass(element, 'show');
    }

  }
  loadClientes() {
    this.dataApiService.getClientes(this.yeoman.preview.url).subscribe(response => {
      this.yeoman.clientes = response;
      this.loadClients();
    });
  }
  loadClients() {
    this.dataApiService.getClients().subscribe(response => {
      this.yeoman.clients = response;
      console.log(response);
      this.comparar();
      this.removerClaseModalOpen();
    });
  };
  comparar() {
    for (let i = 0; i < this.yeoman.clientes.length; i++) {
      for (let j = 0; j < this.yeoman.clients.length; j++) {
        if ((this.yeoman.clientes[i].clcodigo === this.yeoman.clients[j].cliCodigo) && this.yeoman.clients[j].status === "active") {
          this.yeoman.clientes[i].status = "active";
          console.log("codigo conseguido: " + this.yeoman.clientes[i].clcodigo);
          i++;
        }
        else {
          if (this.yeoman.clientes[i].clcodigo === this.yeoman.clients[j].cliCodigo) {
            this.yeoman.clientes[i].status = "unavailable";
          }
        }
      }
    }
  }

  reset() {
    this.dataCli.type = 'client';
    let userUpdate: any = {
      password: "",
      email: '' 
    };
    userUpdate.email = this.yeoman.cliSelected.clientEmail;
    userUpdate.password = this.dataCli.password;
    userUpdate.type = "client";
    const idUserWithoutFirstChar = this.yeoman.cliSelected.idUser.substring(1);
    this.forcedPasswordChange(idUserWithoutFirstChar, this.dataCli.password);
    
  }
  forcedPasswordChange(userId: string, newPassword: string) {
    this.dataApiService.changePassword(userId, newPassword).subscribe(
      (response: string) => {
        // Manejo de respuesta exitosa
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Contraseña actualizada con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        // Manejo de errores
        console.error('Error al cambiar la contraseña:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al cambiar la contraseña',
          text: 'Ha ocurrido un error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
          showConfirmButton: true
        });
      }
    );
  }
  

  registrarUsuario() {
    this.dataCli.type = 'client';
    this.authRESTService.registerUser(this.dataCli.email, this.dataCli.password, 'client').subscribe(
      response => {
        console.log('Usuario registrado:', response);
        if (response && response.id) {
          const userId = response.id;
          this.dataCli.idUser = userId;
          this.dataCli.type = 'client';
          console.log('ID del usuario registrado:', userId);
          this.onSubmitClient();
        }
      },
      error => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}
