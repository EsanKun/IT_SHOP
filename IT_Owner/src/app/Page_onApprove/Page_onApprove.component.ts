import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { auditTime } from 'rxjs';
import { MixProduct } from '../model/onApprove';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ApproveService } from '../services/approve.service';
import { Router } from '@angular/router';
import { testMixProduct } from '../model/testMixProduct';
import { TestMixProductService } from '../services/testMixProduct.service';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-Page_onApprove',
  templateUrl: './Page_onApprove.component.html',
  styleUrls: ['./Page_onApprove.component.css']
})
export class Page_onApproveComponent implements OnInit {

  date = new Date();
  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  onApproveProducts:MixProduct[]=[];
  mixProducts:testMixProduct[]=[];
  
  approveProduct:MixProduct={
    id: '',
    Pid1: '',
    Pid2: '',
    brand: '',
    gen: '',
    type: 'SET (สินค้าจัดชุด)',
    description: '',
    amount: 0,
    price: 0,
    discount: 0,
    image: ''
  };

  mixProduct:testMixProduct={
    id: '',
    Pid: '',
    brand: '',
    gen: '',
    type: 'SET (สินค้าจัดชุด)',
    status: '',
    description: '',
    amount: 0,
    price: 0,
    discount: 0,
    image: ''
  };

  addProductRequest:Product = {
    pid: '',
    brand: '',
    gen: '',
    type: 'SET (สินค้าจัดชุด)',
    amount: 0,
    description: '',
    price: 0,
    image: ''
  };

  updateProductRequest:Product = {
    pid: '',
    brand: '',
    gen: '',
    type: 'SET (สินค้าจัดชุด)',
    amount: 0,
    description: '',
    price: 0,
    image: ''
  };

  store_mixProduct:any[] = [];

  display : boolean = false;

  price_discount:number=0;

  visible : boolean = false;

  store_PID : string = '';

  IdMP:string ='';

  searchInput:string='';

  set_status:any[] = [
    {"status" : "ทั้งหมด"},
    {"status" : "รอการอนุมัติ"},
    {"status" : "อนุมัติ"},
    {"status" : "ไม่อนุมัติ"},
  ];

  selectedStatus: string = '';

  constructor(private productService : ProductService, 
    private approveService : ApproveService,
    private testService : TestMixProductService,
    private router : Router) { }

  ngOnInit() {
    this.testService.getAlltestMixProduct()
    .subscribe(( result : testMixProduct[]) =>
    {
      console.log(result);
      this.mixProducts = result;
      //this.mixProduct = result[1];
    }
    )
  }

  inputSearch(text: string){
    if(text == ''){
      this.ngOnInit();
    }
    else{
      this.mixProducts = this.mixProducts.filter(product =>{
        return (
          product.id.toString().toLocaleLowerCase()
          .includes(this.searchInput.toLowerCase())|| 
          product.brand.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          product.gen.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
        );
      });
      console.log(text);
      this.onInput.emit(text);
      console.log(text);
    }
  }

  addToTable(id:number){
    console.log('SID number : ',id);
  }

  statusSelected(){
    this.mixProducts = [];
    if(this.selectedStatus == 'ทั้งหมด'){
      this.ngOnInit();
    }else{
      this.testService.getMixProductByStatus(this.selectedStatus)
    .subscribe(( result : testMixProduct[]) =>
    {
      console.log('RESULT : ',result);
      console.log(result);
      this.mixProducts = result;
    }
    )
    }
    
  }
  

  selectedMixProduct(id:string){

    //console.log("ID : ",id);
    this.display = true;

    this.testService.gettestMixProduct(id)
    .subscribe(( result : testMixProduct) =>
    {
      //console.log("RESULT : ",result);
      this.mixProduct = result;
      this.price_discount = result.price - (result.price * (result.discount/100));
      this.IdMP = result.id;
      this.store_PID = result.Pid;
    }
    )
  }

  showDetail(id:string){
    this.selectedMixProduct(id);
    this.visible = true;
  }

  approval(id:string, event:any){
    event.stopPropagation();
    // ตรวจสอบและดำเนินการอนุมัติสินค้าตาม productId
    const selected = this.mixProducts.find(p => p.id == id);
    this.mixProduct = selected;
    //console.log('DATA : ', this.selectedMixProduct(id));
    this.setProduct(this.mixProduct);
    console.log("mixProduct : ", this.mixProduct);
    console.log("Approve Product : ", this.addProductRequest);
    this.IdMP = this.approveProduct.id;
    this.productService.addProduct(this.addProductRequest)
    .subscribe({
      next: (product) => {
        console.log(product);
        this.updateApprovement('อนุมัติ');
      }
    });
    console.log(this.addProductRequest);
  }
  
  disapproval(id:string, pid:string,event:any){
    event.stopPropagation();
    const selected = this.mixProducts.find(p => p.id == id);
    this.mixProduct = selected;
    console.log("PRODUCT : ", this.mixProduct);
    console.log("ID : ", this.mixProduct.id);
    console.log("selectedproduct amount : ", this.mixProduct.amount);
    const pidArray: string[] = pid.split(",").map(x => x.trim());

    pidArray.forEach(element => {
      if(element != ''){
        console.log("ELEMENT : ", element);
        this.updateProductAmount(element, this.mixProduct.amount);
      }else{
        console.log("ELEMENT IS NULL ");
      }
    });
    this.updateApprovement('ไม่อนุมัติ');
  }

  setProduct(new_product:any){
    this.addProductRequest.brand = this.mixProduct.brand;
    this.addProductRequest.gen = this.mixProduct.gen;
    this.addProductRequest.type = this.mixProduct.type;
    this.addProductRequest.description = this.mixProduct.description;
    this.addProductRequest.price = this.price_discount;
    this.addProductRequest.amount = this.mixProduct.amount;
    this.addProductRequest.image = this.mixProduct.image;

    this.IdMP = this.approveProduct.id;
  }

  updateProductAmount(Pid:string, amount:number){
    console.log('UPDATE AMOUNT : ', Pid);
    this.productService.getProduct(Pid)
    .subscribe(( result : Product) =>
    {
      this.updateProductRequest = result;
      this.updateProductRequest.amount += amount;
      this.updateProduct();
    });
  }

  updateProduct(){
    console.log("PID : ", this.updateProductRequest.pid);
    console.log("UPDATE PRODUCT : ", this.updateProductRequest);
    this.productService.updateProduct(this.updateProductRequest.pid, this.updateProductRequest)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        //this.ngOnInit();
      }
    });
  }

  updateApprovement(status:string){
    console.log("สถานะการอนุมัติ : ", status);
    this.mixProduct.status = status;
    console.log('CHECK : ', this.mixProduct);
    console.log('CHECK ID : ', this.mixProduct.id);
    this.testService.updatetestMixProduct(this.mixProduct.id, this.mixProduct)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        this.ngOnInit();
      }
    });
  }

  deleteMixProduct_AfterAdd(id:string){

    console.log("DELETE FROM ID : ",id);
    
    this.approveService.deleteMixProduct(id)
    .subscribe({
      next: (response) =>{
        this.ngOnInit();
      }
    });
  }



}
