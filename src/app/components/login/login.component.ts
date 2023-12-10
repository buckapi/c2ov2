import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserInterface } from '@interfaces/user-interface'; 
import { Butler } from '@app/services/butler.service';
import{NgxUiLoaderService} from 'ngx-ui-loader';
import { Yeoman } from '@app/services/yeoman.service';

declare var NgForm:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngFormLogin: FormGroup;
  submitted = false;
  returnUrl: any;
  public isError = false;
  public isLogged =false;
  message:any="Error en datos de acceso"; 
  constructor(
    private ngxService: NgxUiLoaderService,
    public router:Router,
    public _butler:Butler,
    public yeoman:Yeoman,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public AuthRESTService:AuthRESTService
  ) {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
   }
  public user : UserInterface ={
    name:"",
    email:"",
    password:""
  };   
  ngOnInit(): void {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.ngFormLogin.controls;
  }
  onIsError(): void {
    // this.ngxService.stop("loader-02");
  this.isError = true;
  this.ngxService.stop("loader-02");
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['']);
    }
  }
  onLogin(){
    this.submitted = true;
    if (this.ngFormLogin.invalid) {
      return;
    } 
     this.ngxService.start("loader-02");
    return this.AuthRESTService.loginUser(
      this.ngFormLogin.value.email, 
      this.ngFormLogin.value.password
    )
    .subscribe( 
      data => {
        this.AuthRESTService.setUser(data.user);
        const token = data.id;
        this.yeoman.user=data;
        this.AuthRESTService.setToken(token);
        localStorage.setItem('userId', data.userId);
        this._butler.userd="p"+data.userId;
        this._butler.isLogged=true;
        this._butler.name=data.name;
        this._butler.userActive=data;
        let typeAct=data.user.type;
        this.isError = false;
        if(typeAct=='client'){this.yeoman.idClient='c'+data.userId;}
      
        this.ngxService.stop("loader-02");
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('type', typeAct);
        this.router.navigate(['']);      
      },
       error => this.onIsError()
    ); 
  }
}
