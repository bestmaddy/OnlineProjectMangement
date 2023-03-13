import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  logindto = new loginDto
  @ViewChild('loginForm', { static: true })
  loginForm!: NgForm;

  constructor(private service: ServiceService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

  }

  login(data: NgForm) {
    console.log("data :", data.value)
    if (data.valid) {
      this.service.sendMessage("Login",data.value)
    }else{
      alert("enter valid username password");
    }
  }

}

export class loginDto {
  userName?: string;
  password?: string
}
