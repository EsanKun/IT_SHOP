import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

constructor(private http : HttpClient) { }

getEmp_url = "https://localhost:7239/api/Employees"

addEmp_url = "https://localhost:7239/api/Employees"

  getAllEmployees() : Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.getEmp_url);
  }

  addEmployee(addEmployeeRequest: Employee) : Observable<Employee>{
    addEmployeeRequest.eid = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.addEmp_url, addEmployeeRequest);
  }

  authentication(loginRequest : Employee):Observable<Employee>{
    return this.http.post<Employee>(this.addEmp_url+'/authenticate', loginRequest);
  }

  getEmployee(id:string) : Observable<Employee> {
    return this.http.get<Employee>(this.getEmp_url + '/' + id);
  }

  getEmployeesBySearch(search:string) : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getEmp_url + '/search?input=' + search);
  }

  updateEmployee(id:string, updateEmployeeRequest: Employee ) : Observable<Employee>{
    return this.http.put<Employee>(this.getEmp_url + '/' + id, updateEmployeeRequest);
  }

  deleteEmployee(id:string): Observable<Employee>{
    return this.http.delete<Employee>(this.getEmp_url + '/' + id);
  }

}
