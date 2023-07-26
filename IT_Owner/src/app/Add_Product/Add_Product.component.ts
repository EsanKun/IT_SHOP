import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-Add_Product',
  templateUrl: './Add_Product.component.html',
  styleUrls: ['./Add_Product.component.css']
})
export class Add_ProductComponent implements OnInit {

  addProductRequest: Product = {
    pid: '',
    brand: '',
    gen: '',
    type: 'CPU (ซีพียู)',
    amount: 0,
    description: '',
    price: 0,
    image: ''
  };

  product_type:any[] = [
    {"type" : "CPU (ซีพียู)"},
    {"type" : "MAINBOARD (เมนบอร์ด)"},
    {"type" : "RAM (หน่วยความจำ)"},
    {"type" : "Graphics Cards (การ์ดแสดงผล)"},
    {"type" : "CASE (เคส)"},
    {"type" : "Optiocal Disk Drive (เครื่องอ่านและบันทึกแผ่นซีดี)"},
    {"type" : "Sound Card (การ์ดเสียง)"},
    {"type" : "Card Reader (เครื่องอ่านเม็มโมรี่การ์ด)"},

  ];

  selectedType :string = '';

  constructor(private productSerevice : ProductService, private router : Router) { }

  ngOnInit() {
  }

  typeSelected(){
    console.log(this.selectedType);
  }

  addProduct(){
    this.productSerevice.addProduct(this.addProductRequest)
    .subscribe({
      next: (product) => {
        console.log(product);
        this.router.navigate(['product']);
      }
    });
    console.log(this.addProductRequest);
  }

}
