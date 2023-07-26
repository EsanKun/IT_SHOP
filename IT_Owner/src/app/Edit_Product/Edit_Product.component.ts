import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-Edit_Product',
  templateUrl: './Edit_Product.component.html',
  styleUrls: ['./Edit_Product.component.css']
})
export class Edit_ProductComponent implements OnInit {

  editProductRequest: Product = {
    pid: '',
    brand: '',
    gen: '',
    type: '',
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

  selectedType: string = '';

  

  constructor(private route : ActivatedRoute, private productService : ProductService,
    private router : Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe({
      next : (params) => {
        const id = params.get('id');

        if(id){
          // call api
          this.productService.getProduct(id).subscribe({
            next: (response) => {
              this.editProductRequest = response;
              console.log("PRODUCT : ",response);
              this.selectedType = response.type;
              console.log("TYPE : ",this.selectedType);
            }
          });
        }
      }
    })

  }

  typeSelected(){
    console.log(this.selectedType);
    this.editProductRequest.type = this.selectedType;
  }

  updateProduct(){
    console.log("PID : ", this.editProductRequest.pid);
    console.log("Type : ",this.editProductRequest.type);
    this.productService.updateProduct(this.editProductRequest.pid, this.editProductRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        this.router.navigate(['product']);
      }
    });
  }

}
