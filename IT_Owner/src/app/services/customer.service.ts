import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  API_url = "https://localhost:7239/api/Customers"; 

constructor(private http: HttpClient) { }

public getAllCustomers(): Observable<Customer[]> {
  return this.http.get<Customer[]>(this.API_url);
  
}

addCustomer(addCustomerRequest: Customer) : Observable<Customer>{
  addCustomerRequest.cid = '00000000-0000-0000-0000-000000000000';
  return this.http.post<Customer>(this.API_url, addCustomerRequest);
}

getCustomer(id:string) : Observable<Customer> {
  return this.http.get<Customer>(this.API_url + '/' + id);
}

getCustomerByTel(telPhone:string) : Observable<Customer> {
  return this.http.get<Customer>(this.API_url + '/telPhone/' + telPhone);
}

getCustomerBySearch(search:string) : Observable<Customer[]> {
  return this.http.get<Customer[]>(this.API_url + '/search?input=' + search);
}

updateCustomer(id:string, updateCustomerRequest: Customer ) : Observable<Customer>{
  return this.http.put<Customer>(this.API_url + '/' + id, updateCustomerRequest);
}

deleteCustomer(id:string): Observable<Customer>{
  return this.http.delete<Customer>(this.API_url + '/' + id);
}

}
