import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  username : string = '';
  password : string = '';

  LoginRequest : any = {
    userName : '',
    password : ''
  };

  constructor(private LoginService : EmployeesService,
    private router : Router) { }

  ngOnInit() {
  }

  // hideShowPass(){
  //   this.isText = !this.isText;
  //   this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  //   this.isText ? this.type = "text" : this.type = "password";
  // }

  onSubmit(){
    console.log("USERNAME : ", this.username);
    console.log("PASSWORD : ", this.password);
    this.LoginRequest.userName = this.username;
    this.LoginRequest.password = this.password;
    console.log(this.LoginRequest);

    if(this.LoginRequest.userName == 'owner' && this.LoginRequest.password == 'own123'){
      this.router.navigate(['owner']);
    }else{
      this.LoginService.authentication(this.LoginRequest)
    .subscribe({
      next: (employee) => {
        console.log(employee);
        //this.router.navigate(['product']);
        if(employee.role == 1){
          this.router.navigate(['saleclerk']);
        }
        else if(employee.role == 2){
          this.router.navigate(['warehouse']);
        }
      }
    });
    }

  }

  userinput(text:string){
    console.log("USERNAME : ", text);
  }

  passinput(text:string){
    console.log("PASSWORD : ", text);
  }

}
