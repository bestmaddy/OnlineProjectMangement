import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Nav } from '../modules/nav';

const nav: Nav[] = [
  { id: 1, name: "Dashboard", selected: false, path:"/layout/dashboard", icon:"bi bi-speedometer2" },
  { id: 2, name: "Project", selected: false, path:"/layout/project", icon:"bi bi-columns-gap"},
  { id: 3, name: "Create", selected: false, path:"/layout/create", icon:"bi bi-receipt" },
]

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  socket: Socket | undefined;
  ipDetails = { ip: "localhost", port: 4201 }
  ProjectObservable = new Subject<any>()

  constructor(private router: Router, private toastr: ToastrService) {
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

  sendMessage(header: any, args: any): void {
    console.log("Sending request:", header, args)
    this.socket?.emit(String(header), args)
  }
}
