import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customer } from '../model/customer';
import { auditTime } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Page_Customer',
  templateUrl: './Page_Customer.component.html',
  styleUrls: ['./Page_Customer.component.css']
})
export class Page_CustomerComponent implements OnInit {


  customers:Customer[]=[];
  searchInput:string='';

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  constructor(private customerService : CustomerService,
    private router:Router) { }

  ngOnInit() : void {
    this.customerService
    .getAllCustomers()
    .subscribe((result : Customer[]) => {
      // console.log("Result : ",result)
      this.customers = result;
      console.log("Customer Data : ",this.customers);
    });
  }

  edit(id : number){
    this.router.navigate(['/customer', 'edit', id]);
  }

  remove(index : number){
    this.customers.splice(index,1);
  }

  inputSearch(text: string){
    if(text == ''){
      this.ngOnInit();
    }
    else{
      this.customers = this.customers.filter(customer =>{
        return (
          customer.cid.toString().toLocaleLowerCase()
          .includes(this.searchInput.toLowerCase())|| 
          customer.name.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          customer.telPhone.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
        );
      });
      console.log(text);
      this.onInput.emit(text);
      console.log(text);
    }
  }

  deleteCustomer(id:string){
    console.log("DELETE FROM ID : ",id);
    this.customerService.deleteCustomer(id)
    .subscribe({
      next: (response) =>{
        this.ngOnInit();
      }
    });
  }

}
