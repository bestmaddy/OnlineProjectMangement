import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isuserlogin: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.isuserlogin = this.service.isUserloggedIn();
  }
  userlogout() {
    this.service.logout();
  }
}
