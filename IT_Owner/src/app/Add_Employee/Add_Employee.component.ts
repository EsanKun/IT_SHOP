import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeesService } from '../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Add_Employee',
  templateUrl: './Add_Employee.component.html',
  styleUrls: ['./Add_Employee.component.css']
})
export class Add_EmployeeComponent implements OnInit {

  addEmployeeRequest: Employee = {
    eid: '', 
    name: '',
    telPhone: '', 
    email: '',
    address:'', 
    role: 1,
    userName:'',
    password:'',
    token:''  
  };

  emp_role:any[] = [
    {"define" : "พนักงานขายสินค้า"},
    {"define" : "พนักงานคงคลัง"}
  ];

  selectedRole : string = '';

  constructor(private employeeSerevice : EmployeesService, private router : Router) { }

  ngOnInit() {
  }

  roleSelected(){

    if(this.selectedRole == "พนักงานขายสินค้า"){
      console.log("role : ",this.selectedRole)
      this.addEmployeeRequest.role = 1;
      console.log("role : ",this.addEmployeeRequest)
    }
    else if(this.selectedRole == "พนักงานคงคลัง"){
      console.log("role : ",this.selectedRole)
      this.addEmployeeRequest.role = 2;
      console.log("role : ",this.addEmployeeRequest)
    }
    
  }

  addEmployee(){
    this.employeeSerevice.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next: (employee) => {
        console.log(employee);
        this.router.navigate(['employee']);
      }
    });
    console.log(this.addEmployeeRequest);
  }

}
