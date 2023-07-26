import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../model/product';
import { auditTime } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-Page_Product',
  templateUrl: './Page_Product.component.html',
  styleUrls: ['./Page_Product.component.css']
})
export class Page_ProductComponent implements OnInit {


  products : Product[] = [];

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  searchedProducts: Product[]=this.products;

  product_type:any[] = [
    {"type" : "สินค้าทั้งหมด"},
    {"type" : "CPU (ซีพียู)"},
    {"type" : "MAINBOARD (เมนบอร์ด)"},
    {"type" : "RAM (หน่วยความจำ)"},
    {"type" : "Graphics Cards (การ์ดแสดงผล)"},
    {"type" : "CASE (เคส)"},
    {"type" : "Optiocal Disk Drive (เครื่องอ่านและบันทึกแผ่นซีดี)"},
    {"type" : "Sound Card (การ์ดเสียง)"},
    {"type" : "Card Reader (เครื่องอ่านเม็มโมรี่การ์ด)"},
    {"type" : "SET (สินค้าจัดชุด)"},
  ];

  selectedType: string = '';

  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit() {
    this.productService.getAllProduct()
    .subscribe(( result : Product[]) =>
    {
      console.log(result);
      this.products = result;
    }
    )
  }

  edit(id : number){
    this.router.navigate(['/product', 'edit', id]);
  }

  remove(index : number){
    this.products.splice(index,1);
  }

  deleteProduct(id:string){
    console.log("DELETE FROM ID : ",id);
    this.productService.deleteProduct(id)
    .subscribe({
      next: (response) =>{
        this.ngOnInit();
        this.router.navigate(['/product']);
      }
    });
  }

  inputSearch(text: string){
    console.log(text);
    this.onInput.emit(text);
    this.products = [];
    if(text == ''){
      console.log('มันจะเอาสินค้าทั้งหมด');
      this.ngOnInit();
    }else{
      this.productService.getProductBySearch(text)
    .subscribe(( result : Product[]) =>
    {
      //this.products = [];
      console.log('RESULT : ',result);
      console.log(result);
      this.products = result;
    }
    )
    }

  }

  typeSelected(){
    console.log("SELECTED TYPE : ",this.selectedType);
    this.products = [];
    if(this.selectedType == 'สินค้าทั้งหมด'){
      
      this.ngOnInit();
    }else{
      this.productService.getProductByType(this.selectedType)
    .subscribe(( result : Product[]) =>
    {
      this.products = [];
      console.log('RESULT : ',result);
      console.log(result);
      this.products = result;
    }
    )
    }
    
  }

}
