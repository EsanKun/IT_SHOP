import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-Edit_Employee',
  templateUrl: './Edit_Employee.component.html',
  styleUrls: ['./Edit_Employee.component.css']
})
export class Edit_EmployeeComponent implements OnInit {

  editEmployeeRequest: Employee = {
    eid: '', 
    name: '',
    telPhone: '', 
    email: '',
    address:'', 
    role: 1,
    userName:'',
    password:'',
    token:'',  
  };

  emp_role:any[] = [
    {"define" : "พนักงานขายสินค้า"},
    {"define" : "พนักงานคงคลัง"}
  ];

  selectedRole : string = '';

  constructor(private route : ActivatedRoute, private employeeService : EmployeesService,
    private router : Router) { }

  ngOnInit():void {
    this.route.paramMap.subscribe({
      next : (params) => {
        const id = params.get('id');

        if(id){
          // call api
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.editEmployeeRequest = response;
              console.log("data : ",response);
              if(response.role == 1){
                this.selectedRole = "พนักงานขายสินค้า";
              }else if(response.role == 2){
                this.selectedRole = "พนักงานคงคลัง";
              }
            }
          });
        }
      }
    })
  }

  roleSelected(){

    if(this.selectedRole == "พนักงานขายสินค้า"){
      console.log("role : ",this.selectedRole)
      this.editEmployeeRequest.role = 1;
    }
    else if(this.selectedRole == "พนักงานคงคลัง"){
      console.log("role : ",this.selectedRole)
      this.editEmployeeRequest.role = 2;
    }
    
  }

  updateEmployee(){
    console.log("EID : ", this.editEmployeeRequest.eid);
    this.employeeService.updateEmployee(this.editEmployeeRequest.eid, this.editEmployeeRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        this.router.navigate(['employee']);
      }
    });
  }

  deleteEmployee(id:string){
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['employee']);
      }
    });
  }

}
