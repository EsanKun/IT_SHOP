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

  searchInput:string='';

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
