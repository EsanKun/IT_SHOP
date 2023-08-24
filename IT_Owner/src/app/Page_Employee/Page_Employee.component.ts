import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../model/employee';
import { auditTime } from 'rxjs';
import { EmployeesService } from '../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Page_Employee',
  templateUrl: './Page_Employee.component.html',
  styleUrls: ['./Page_Employee.component.css']
})
export class Page_EmployeeComponent implements OnInit {


  employees:Employee[]=[];
  employeesFilter:Employee[]=[];

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  addEmployeeRequest: Employee = {
    eid: '', 
    name: '',
    telPhone: '', 
    email: '',
    address:'', 
    role: 0,
    userName:'',
    password:'',
    token:''  
  };

  editEmployeeRequest: Employee = {
    eid: '', 
    name: '',
    telPhone: '', 
    email: '',
    address:'', 
    role: 0,
    userName:'',
    password:'',
    token:'',  
  };

  emp_role:any[] = [
    {"define" : "เจ้าของร้าน"},
    {"define" : "พนักงานขายสินค้า"},
    {"define" : "พนักงานคงคลัง"}
  ];

  selectedRole : string = '';

  searchInput:string='';

  addEmployee_display:boolean = false;
  editEmployee_display:boolean = false;

  constructor(private employeeService : EmployeesService, private router : Router) { }

  ngOnInit() : void {
    this.employeeService.getAllEmployees()
    .subscribe(( result : Employee[]) =>
    {
      console.log(result);
      this.employees = result;
    }
    )
  }

  getEmployee(){
    this.employeeService.getAllEmployees()
    .subscribe(( result : Employee[]) =>
    {
      console.log(result);
      this.employees = result;
    }
    )
  }

  show_addEmployee(){
    this.addEmployee_display = true;
    this.selectedRole = "เจ้าของร้าน";
  }

  show_editEmployee(id:string){
    this.editEmployee_display = true;
    console.log("ID : ", id);
    const employee = this.employees.find(emp => emp.eid == id);
    this.editEmployeeRequest = employee;
    if(employee.role == 0){
      this.selectedRole = "เจ้าของร้าน";
    }
    else if(employee.role == 1){
      this.selectedRole = "พนักงานขายสินค้า";
    }else if(employee.role == 2){
      this.selectedRole = "พนักงานคงคลัง";
    }
  }

  addEmployee(){
    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next: (employee) => {
        console.log(employee);
        // this.router.navigate(['employee']);
        this.addEmployee_display = false;
        this.ngOnInit();
      }
    });
    console.log(this.addEmployeeRequest);
  }

  updateEmployee(){
    console.log("EID : ", this.editEmployeeRequest.eid);
    this.employeeService.updateEmployee(this.editEmployeeRequest.eid, this.editEmployeeRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        // this.router.navigate(['employee']);
        this.editEmployee_display = false;
        this.ngOnInit();
      }
    });
  }

  edit(id : number){
    this.router.navigate(['/employee', 'edit', id]);
  }

  remove(index : number){
    this.employees.splice(index,1);
  }

  deleteEmployee(id:string){
    console.log("DELETE FROM ID : ",id);
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next: (response) =>{
        this.getEmployee();
      }
    });
  }

  roleSelected(){

    if(this.selectedRole == "เจ้าของร้าน"){
      console.log("role : ",this.selectedRole)
      this.addEmployeeRequest.role = 0;
      console.log("role : ",this.addEmployeeRequest)
    }
    else if(this.selectedRole == "พนักงานขายสินค้า"){
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

  inputSearch(text: string){
    if(text == ''){
      this.ngOnInit();
    }
    else{
      this.employees = this.employees.filter(employee =>{
        return (
          employee.eid.toString().toLocaleLowerCase()
          .includes(this.searchInput.toLowerCase())|| 
          employee.name.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          employee.telPhone.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
        );
      });
      console.log(text);
      this.onInput.emit(text);
      console.log(text);
    }
  }

}
