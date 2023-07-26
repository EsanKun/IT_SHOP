import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../model/product';
import { MixProduct } from '../model/onApprove';
import { auditTime } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ApproveService } from '../services/approve.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { TestMixProductService } from '../services/testMixProduct.service';

@Component({
  selector: 'app-Add_MixProduct2',
  templateUrl: './Add_MixProduct2.component.html',
  styleUrls: ['./Add_MixProduct2.component.css']
})
export class Add_MixProduct2Component implements OnInit {

  products : Product[] = [];
  addApproveRequest : MixProduct ={
    id : '',
    Pid1 : '',
    Pid2 : '',
    brand : '',
    gen : '',
    type: '',
    description : '',
    price : 0,
    amount : 0,
    discount : 0,
    image : ''
  };
  store_mixProduct:any[] = [];

  updateProductRequest: Product = {
    pid: '',
    brand: '',
    gen: '',
    type: '',
    amount: 0,
    description: '',
    price: 0,
    image: ''
  };
  
  count_check_array : number=0;
  maxAmount : number=0;
  display : boolean = false;
  mpAmount:number = 1;
  discount:number = 5;
  messages1:Message[]=[];

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  constructor(private productService : ProductService, 
    private approveService : ApproveService,
    //private mixproService : TestMixProductService,
    private router : Router,
    private messageService: MessageService
    ) { }

  ngOnInit() {

    this.productService.getAllProduct()
    .subscribe(( result : Product[]) =>
    {
      console.log(result);
      this.products = result;
    }
    )
    this.messages1=[
      {severity:'success', summary: 'Heading', detail:'จัดสินค้ารวมชุดสำเร็จ โปรดรอการอนุมัติ'},
      {severity:'error', summary: 'Heading', detail:'สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้'}
    ];

  }

  addToMixProduct(Pid : string){

    this.productService.getProduct(Pid)
    .subscribe(( result : Product) =>
    {
      console.log("RESULT : ",result);
      if(result.type == "SET (สินค้าจัดชุด)"){
        console.log("สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้");
        this.messages1 = [{severity:'error', summary: 'Heading', detail:'สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้'}];
      }else{
        if(this.count_check_array<2){

          // เพิ่มสินค้าลงในอาเรย์ ให้ใส่ได้มาสุดสองช่อง
          this.store_mixProduct[this.count_check_array] = result;
          this.count_check_array++;
  
          // หาจำนวนที่น้อยที่สุดของสินค้าแล้วกำหนดให้เป็นค่าที่มากที่สุดที่สามารถจัดชุดสินค้าได้
          if(this.count_check_array == 1) this.maxAmount = result.amount;
          if(result.amount < this.maxAmount) this.maxAmount = result.amount;
        }
      }
    }
    )
  }

  deleteMixProduct(index : number){
    // ลบสินค้าออกจากการจัดชุดหนึ่งชิ้น
    this.store_mixProduct.splice(index,1);
    this.count_check_array--;
  }

  showDialog() {
    this.display = true;
  }

  inputSearch(text: string){
    console.log(text);
    this.onInput.emit(text);
    
  }

  setMixProduct(){
    this.addApproveRequest.Pid1 = this.store_mixProduct[0].pid;
    this.addApproveRequest.Pid2 = this.store_mixProduct[1].pid;
    this.addApproveRequest.brand = this.store_mixProduct[0].brand 
    + " รวมกับ " + this.store_mixProduct[1].brand;
    this.addApproveRequest.gen = this.store_mixProduct[0].gen 
    + " รวมกับ " + this.store_mixProduct[1].gen;
    this.addApproveRequest.type = 'SET (สินค้าจัดชุด)';
    this.addApproveRequest.description = this.store_mixProduct[0].description 
    + " รวมกับ " + this.store_mixProduct[1].description;
    this.addApproveRequest.amount = this.mpAmount;
    this.addApproveRequest.price = this.store_mixProduct[0].price+ this.store_mixProduct[1].price;
    this.addApproveRequest.discount = this.discount;
    this.addApproveRequest.image = this.store_mixProduct[0].image;

    console.log("Mix Product : "+this.addApproveRequest);
  }

  updateProductAmount(){
    this.store_mixProduct.forEach(element => {
      console.log("Element : ",element);
      this.updateProductRequest = element;
      this.updateProductRequest.amount = element.amount - this.mpAmount;
      console.log("update product : ",this.updateProductRequest);
      this.updateProduct();
    });
  }

  updateProduct(){
    console.log("PID : ", this.updateProductRequest.pid);
    this.productService.updateProduct(this.updateProductRequest.pid, this.updateProductRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        this.router.navigate(['product']);
      }
    });
  }

  addMixProduct(){
    this.setMixProduct();
    this.updateProductAmount();
    // บันทึกข้อมูลลงในดาต้าเบส
    this.approveService.addMixProduct(this.addApproveRequest)
    .subscribe({
      next: (approve) => {
        console.log(approve);
        this.router.navigate(['mixProduct']);
        this.store_mixProduct = [];
        this.count_check_array = 0;
      }
    });
    console.log(this.addApproveRequest);
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'สินค้าถูกเพิ่มเข้าสู่ชุดแล้ว' });
  }

}
