import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Nav } from '../modules/nav';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { productDto } from '../product/product.component';

const nav: Nav[] = [
  { id: 1, name: "Dashboard", selected: false, path: "/layout/dashboard", icon: "bi bi-speedometer2" },
  { id: 2, name: "Project", selected: false, path: "/layout/project", icon: "bi bi-columns-gap" },
  { id: 3, name: "Create", selected: false, path: "/layout/create", icon: "bi bi-receipt" },
  { id: 4, name: "Employee", selected: false, path: "/layout/emp", icon: "bi bi-receipt" },
  { id: 5, name: "Product", selected: false, path: "/layout/product", icon: "bi bi-receipt" },
]

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  socket: Socket | undefined;
  ipDetails = { ip: "localhost", port: 3000 }
  ProjectObservable = new Subject<any>()
  ProductObservable = new Subject<any>()
  http: any;
  BaseUrl: any;

  constructor(private router: Router, private toastr: ToastrService, private httpClient: HttpClient) {
    this.socket = io(String(this.ipDetails.ip + ":" + this.ipDetails.port));

    this.socket?.on('Loginstatus', (msg: any) => {
      console.log("value: ", msg)
      if (msg.success) {
        sessionStorage.setItem('authuser', "success");
        // return true;
        router.navigate(['layout/dashboard'])
        this.toastr.success('Login success')
      } else {
        // return false;
        this.toastr.error('Cleck Your UserName and Password')
      }
    })

    this.socket?.on('setProject', (msg: any) => {
      console.log("value: ", msg)
      this.ProjectObservable.next(msg)
    })

    this.socket?.on('setProduct', (msg: any) => {
      console.log("value: ", msg)
      this.ProductObservable.next(msg)
    })
  }

  isUserloggedIn() {
    let user = sessionStorage.getItem('authuser');
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authuser');
    this.toastr.success('You LogOut')
  }

  nav_fun() {
    return nav;
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  saveProduct(data: any): Observable<any> {
    console.log("data:", data)
    const saveProductApi = this.httpClient.post<any>(`http://localhost:3000/SaveProduct`, data, this.httpOptions)
    return (saveProductApi)
  }
  sendMessage(header: any, args: any): void {
    console.log("Sending request:", header, args)
    this.socket?.emit(String(header), args)
  }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>("https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==")
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
