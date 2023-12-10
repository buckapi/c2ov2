 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { Yeoman } from './yeoman.service';

 @Injectable({
   providedIn: 'root'
 })
 export class ExistenciaService {
   private baseUrl = 'https:herdel.info:8443/webapi/existencia';

   constructor(private http: HttpClient,
     public yeoman:Yeoman) { }

   getAllExistencias(urlIn: any): Observable<any> {
     const url = `${urlIn}webapi/existencia/getall?familia=%5Bobject+Object%5D`;
    this.yeoman.existencias=this.http.get<any>(url);
     return this.http.get<any>(url);
   }
 }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Yeoman } from './yeoman.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExistenciaService {
//   constructor(private http: HttpClient, public yeoman: Yeoman) { }

//   getAllExistencias(urlIn:any): Observable<any> {
//     if (this.yeoman.dist !== undefined) {
//       const url = `${urlIn}/getall?familia=%5Bobject+Object%5D`;
//       this.yeoman.existencias = this.http.get<any>(url);
//       return this.yeoman.existencias;
//     } else {
//       // Manejar el caso en que this.yeoman.dist sea indefinido
//       // Puedes lanzar un error, devolver un valor predeterminado o tomar otra acción adecuada.
//       throw new Error('this.yeoman.dist es indefinido'); // Lanza un error en caso de indefinido
//     }
//   }
// }

