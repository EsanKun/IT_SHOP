import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ApproveService } from '../services/approve.service';
import { Product } from '../model/product';
import { MixProduct } from '../model/onApprove';
import { store_Mixproduct } from '../model/store_mixproduct';
import { Message, MessageService } from 'primeng/api';
import { auditTime } from 'rxjs';
import { testMixProduct } from '../model/testMixProduct';
import { TestMixProductService } from '../services/testMixProduct.service';

@Component({
  selector: 'app-Add_Mixproduct',
  templateUrl: './Add_Mixproduct.component.html',
  styleUrls: ['./Add_Mixproduct.component.css'],
  providers: [MessageService]
})
export class Add_MixproductComponent implements OnInit {


  products : Product[] = [];
  mixProductRequest : testMixProduct ={
    id : '',
    Pid : '',
    brand : '',
    gen : '',
    type: '',
    status : '',
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
  
  // เช็คจำนวนสินค้าที่อยู่ในอาเรย์
  count_check_array : number=0;
  // 
  maxAmount : number=0;
  display : boolean = false;
  visible : boolean = false;
  mpAmount:number = 1;
  discount:number = 5;
  messages1:Message[]=[];
  store_PID : string = '';
  pidArray : string[]=[];
  brand:string = '';
  gen:string = '';
  type:string = 'SET (สินค้าจัดชุด)';
  status:string = 'รอการอนุมัติ';
  description:string = '';
  totalPrice:number=0;
  image:string='';

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  constructor(private productService : ProductService, 
    private approveService : ApproveService,
    private router : Router,
    private messageService: MessageService,
    private testService : TestMixProductService,
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

  // addToMixProduct(Pid : string){

  //   this.productService.getProduct(Pid)
  //   .subscribe(( result : Product) =>
  //   {
  //     console.log("RESULT : ",result);
  //     if(result.type == "SET (สินค้าจัดชุด)"){
  //       console.log("สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้");
  //       this.messages1 = [{severity:'error', summary: 'Heading', detail:'สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้'}];
  //     }else{
  //       if(this.count_check_array<2){

  //         // เพิ่มสินค้าลงในอาเรย์ ให้ใส่ได้มาสุดสองช่อง
  //         this.store_mixProduct[this.count_check_array] = result;
  //         this.count_check_array++;
  
  //         // หาจำนวนที่น้อยที่สุดของสินค้าแล้วกำหนดให้เป็นค่าที่มากที่สุดที่สามารถจัดชุดสินค้าได้
  //         if(this.count_check_array == 1) this.maxAmount = result.amount;
  //         if(result.amount < this.maxAmount) this.maxAmount = result.amount;
  //       }
  //     }
  //     //this.products = result;
  //   }
  //   )
  // }

  addToMixProduct(Pid : string){
    this.productService.getProduct(Pid)
    .subscribe(( result : Product) =>
    {
      console.log("RESULT : ",result);
      if(result.type == "SET (สินค้าจัดชุด)"){
        console.log("สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้");
        this.messages1 = [{severity:'error', summary: 'Heading', detail:'สินค้ารวมชุดไม่สามารถจัดรวมชุดซ้ำได้'}];
      }
      else{
        // เก็บข้อมูลของสินค้าไว้ใน array ANY store_mixProduct
        this.store_mixProduct[this.count_check_array] = result;
        this.store_PID += result.pid + ',';
        this.count_check_array++;
        this.totalPrice += result.price;
        // หาค่าที่น้อยที่สุด
        this.maxAmount = Math.min.apply(null, this.store_mixProduct.map(mp => mp.amount));
        console.log("STORE PID : " +this.store_PID);
        this.showPID();
      }
      //this.products = result;
    }
    )
  }

  showPID(){
    this.pidArray = this.store_PID.split(",").map(x => x.trim());
    for (const pid of this.pidArray) {
      // ดำเนินการกับ PID แต่ละตัว
      console.log("PID : ", pid);
    }
    //console.log("After Spilt : ", this.store_PID);
  }

  deleteMixProduct(index : number, pid:string){
    // ลบสินค้าออกจากการจัดชุดหนึ่งชิ้น
    this.store_mixProduct.splice(index,1);
    this.count_check_array--;
    
    // หาค่าที่น้อยที่สุดตัวใหม่
    this.maxAmount = Math.min.apply(null, this.store_mixProduct.map( mp => mp.amount));

    // แยกสตริงของ store_PID เป็นอาร์เรย์ของสตริง
    const pidArray: string[] = this.store_PID.split(",").map(x => x.trim());
    // ค้นหาตำแหน่งของ pid ใน pidArray
    const pidIndex: number = pidArray.indexOf(pid);
    // ถ้าพบ pid ใน pidArray ให้ลบออกจากอาร์เรย์
    if (pidIndex !== -1) {
    pidArray.splice(pidIndex, 1);
    }
    // นำ pidArray กลับมาเป็นสตริง store_PID
    this.store_PID = pidArray.join(", ");
    console.log("DELETE PID: ", this.store_PID);
    console.log("INDEX: ", pidIndex);
  
  }

  // showDialog() {
  //   this.display = true;
  // }

  inputSearch(text: string){
    console.log(text);
    this.onInput.emit(text);
    
  }

  setMixProduct(){
    this.mixProductRequest.Pid = this.store_PID;
    this.mixProductRequest.brand = this.brand;
    this.mixProductRequest.gen = this.gen;
    this.mixProductRequest.type = this.type;
    this.mixProductRequest.status = this.status;
    this.mixProductRequest.description = this.description;
    this.mixProductRequest.amount = this.mpAmount;
    this.mixProductRequest.price = this.totalPrice;
    this.mixProductRequest.discount = this.discount;
    this.mixProductRequest.image = this.image;

    console.log("Mix Product : ", this.mixProductRequest);
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
    // // บันทึกข้อมูลลงในดาต้าเบส
    this.testService.addtestMixProduct(this.mixProductRequest)
    .subscribe({
      next: (approve) => {
        console.log(approve);
        this.router.navigate(['mixProduct']);
        this.store_mixProduct = [];
        this.count_check_array = 0;
        this.visible = false;
      }
    });
    console.log(this.mixProductRequest);
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'สินค้าถูกเพิ่มเข้าสู่ชุดแล้ว' });
  }

  showDialog(){
    this.visible = true;
  }

  sumPrice(){
    this.totalPrice = this.totalPrice * this.mpAmount;
    console.log("TOTAL PRICE : ", this.totalPrice);
  }

}
