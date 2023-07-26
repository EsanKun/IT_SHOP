import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Add_Customer',
  templateUrl: './Add_Customer.component.html',
  styleUrls: ['./Add_Customer.component.css']
})
export class Add_CustomerComponent implements OnInit {

  addCustomerRequest: Customer = {
    cid: '',
    name: '',
    telPhone: '',
    email: ''
  };

  constructor(private customerService : CustomerService, 
    private router : Router) { }

  ngOnInit() {
  }

  addCustomer(){
    this.customerService.addCustomer(this.addCustomerRequest)
    .subscribe({
      next: (customer) => {
        console.log(customer);
        this.router.navigate(['customer']);
      }
    });
    console.log(this.addCustomerRequest);
  }

}
