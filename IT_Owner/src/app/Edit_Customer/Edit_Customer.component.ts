import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-Edit_Customer',
  templateUrl: './Edit_Customer.component.html',
  styleUrls: ['./Edit_Customer.component.css']
})
export class Edit_CustomerComponent implements OnInit {

  editCustomerRequest: Customer = {
    cid: '', 
    name: '',
    telPhone: '', 
    email: ''  
  };

  constructor(private route : ActivatedRoute, private customerService : CustomerService,
    private router : Router) { }

  ngOnInit():void {
    this.route.paramMap.subscribe({
      next : (params) => {
        const id = params.get('id');

        if(id){
          // call api
          this.customerService.getCustomer(id).subscribe({
            next: (response) => {
              this.editCustomerRequest = response;
              console.log("data : ",response);
            }
          });
        }
      }
    })
  }

  updateCustomer(){
    console.log("EID : ", this.editCustomerRequest.cid);
    this.customerService.updateCustomer(this.editCustomerRequest.cid, this.editCustomerRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        this.router.navigate(['customer']);
      }
    });
  }

}
