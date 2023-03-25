import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Nav } from '../modules/nav';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  isuserlogin: boolean = false;
  isShow: boolean = true;
  nav!: Nav[];
  isSideBarActive: boolean = false;

  constructor(private service: ServiceService, private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.isuserlogin = this.service.isUserloggedIn();
    this.nav = this.service.nav_fun()
  }

  togglesideBar() {
    console.log("toggle")
    this.isSideBarActive = !this.isSideBarActive;
  }

  userlogout() {
    this.service.logout();
  }

  selectNav(name: Nav) {
    this.nav.forEach(item => {
      item.selected = false;
    });
    name.selected = true;
  }
  
}
