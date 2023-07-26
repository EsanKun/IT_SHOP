import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';
import { SaleService } from '../services/sale.service';
import { SaleDetailService } from '../services/saleDetail.service';
import { Employee } from '../model/employee';
import { Customer } from '../model/customer';
import { Sales } from '../model/Sales';
import { SalesDetail } from '../model/SalesDetail';

@Component({
  selector: 'app-Page_sellProduct',
  templateUrl: './Page_sellProduct.component.html',
  styleUrls: ['./Page_sellProduct.component.css']
})
export class Page_sellProductComponent implements OnInit {

  Products : Product[]=[];

  Basket : Product[]=[];

  Sale : Product[]=[];

  productRequest:Product = {
    pid: '',
    brand: '',
    gen: '',
    type: '',
    amount: 0,
    description: '',
    price: 0,
    image: ''
  };

  salesRequest:Sales = {
    sid : '',
    customerTelPhone : '',
    customerType : '',
    saleDate: new Date,
    totalAmount:0,
    totalPrice:0
  };

  detailRequest:SalesDetail={
    sDid : '',
    salesId:'',
    productId:'',
    eachAmount:0,
    totalPrice:0
  };

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
  searchInput:string='';
  telPhone:string='';
  customerType:string='';

  SaleId:string = '';
  prodcutId:string = '';

  visible : boolean = false;
  visible2 : boolean = false;
  display : boolean = false;

  itemsInBasket : number = 0;
  mpAmount:number=1;

  constructor(private productService : ProductService, 
    private customerService : CustomerService,
    private saleService : SaleService,
    private detailService : SaleDetailService) { }

  ngOnInit() {
    this.productService.getAllProduct()
    .subscribe(( result : Product[]) =>
    {
      console.log(result);
      this.Products = result;
      
      // this.selectedProduct = result[0];
    }
    )
  }

  addToBasket(id:string, event:any){
    event.stopPropagation();
    console.log("ID : ", id);

    const bast = this.Basket.find(p => p.pid == id);

    if(bast){
      console.log("มีสินค้าในตะกร้าแล้ว");
    }else{
      const selected = this.Products.find(p => p.pid == id);
      this.Basket[this.itemsInBasket] = selected;

      const saleItem = { ...selected, amount: 0 };
      this.Sale[this.itemsInBasket] = saleItem;
      this.Sale[this.itemsInBasket].amount = 0;
      this.itemsInBasket++; 
    }
  }

  // sell(){
  //   console.log("สิ่งที่ซื้อ : ", this.Sale);
  //   console.log("เบอร์โทรลูกค้า : ", this.telPhone);
  //   this.checkTelPhone(this.telPhone);
  //   console.log("ประเภทลูกค้า : ", this.customerType);
  //   //console.log("ประเภทลูกค้า : ", this.checkTelPhone(this.telPhone));
  // }

  async sell() {
    console.log("สิ่งที่ซื้อ : ", this.Sale);
    console.log("เบอร์โทรลูกค้า : ", this.telPhone);
    this.customerType = await this.checkTelPhone(this.telPhone);
    console.log("ประเภทลูกค้า : ", this.customerType);

    let totalPrice = 0;
    let totalAmount = 0;

    this.Sale.forEach(product =>{
      totalPrice += product.price * product.amount;
      totalAmount += product.amount;
    });

    console.log("จำนวนสินค้าทั้งหมด : ", totalAmount);
    console.log("ราคารวม : ", totalPrice);
    this.salesRequest = await this.setSales(totalPrice, totalAmount);
    this.salesRequest = await this.addSales(this.salesRequest);
    console.log("ขายแล้ววว : ", this.salesRequest);

    console.log("SALEID : ", this.salesRequest.sid);
    console.log("SALEID : ", this.salesRequest);
    this.SaleId = this.salesRequest.sid;

    let i = 0;

    this.Sale.forEach(product =>{
      console.log("I : ", i);
      console.log("PID : ", product.pid);
      console.log("SALEID : ", this.salesRequest.sid);
      this.detailRequest.salesId = this.salesRequest.sid;
      this.detailRequest.productId = product.pid;
      this.detailRequest.eachAmount = product.amount;
      this.detailRequest.totalPrice = product.amount * product.price;
      console.log("DETEIL : ", this.detailRequest);
      this.addsaleDetail(this.detailRequest, this.salesRequest.sid, product.pid);
      this.Basket[i].amount =  this.Basket[i].amount - product.amount;
      console.log("จำนวนสินค้าใหม่ : ", this.Basket[i]);
      this.updateProduct(this.Basket[i]);
      i++;
    });

    this.Basket = [];
    this.Sale = [];
    this.visible2 = false;
    this.ngOnInit();
  }

  async checkTelPhone(tel: string): Promise<string> {
    try {
      const result: Customer = await this.customerService.getCustomerByTel(tel).toPromise();
      console.log('ลูกค้า : ', result);
      this.customerType = 'สมาชิก';
      return this.customerType;
    } catch (error) {
      this.customerType = 'ลูกค้าทั่วไป';
      return this.customerType;
    }
  }

  async setSales(totalPrice : number, totalAmount : number): Promise<Sales>{
    this.salesRequest.customerTelPhone = this.telPhone;
    this.salesRequest.customerType = this.customerType;
    this.salesRequest.totalAmount = totalAmount;
    this.salesRequest.totalPrice = totalPrice;
    return this.salesRequest;
  }

  async addSales(data:Sales) : Promise<Sales>{
    console.log("ข้อมูลการขาย : ", data);
    try {
      const result: Sales = await this.saleService.addSale(data).toPromise();
      //console.log('หลังจากขายแล้ว : ', result);
      //this.salesRequest = result;
      return result;
    } catch (error) {
      return null;
    }
    // this.saleService.addSale(data)
    // .subscribe({
    //   next: (sales) => {
    //     console.log(sales);
    //     sales;
    //     return sales;
    //   }
    // });
  }

  async addsaleDetail(detail:SalesDetail, saleId:string, productId:string){
    
    console.log("ไอดีการขาย : ", saleId);
    console.log("ไอดีสินค้า : ", productId);
    console.log("รายละเอียดสินค้า : ", detail);
    
    this.detailService.addDetail(detail)
    .subscribe({
      next: (detail) => {
        console.log("รายละเอียดการขาย : ", detail);
      }
    });
  }

  updateProduct(product:Product){
    this.productService.updateProduct(product.pid, product)
    .subscribe({
      next : (response) => {
        console.log("Update Success");
        //this.router.navigate(['product']);
      }
    });
  }

  showBasket(){
    this.visible2 = true;
  }
  

  typeSelected(){
    console.log("SELECTED TYPE : ",this.selectedType);
    this.Products = [];
    if(this.selectedType == 'สินค้าทั้งหมด'){
      
      this.ngOnInit();
    }else{
      this.productService.getProductByType(this.selectedType)
    .subscribe(( result : Product[]) =>
    {
      this.Products = [];
      console.log('RESULT : ',result);
      console.log(result);
      this.Products = result;
    }
    )
    }
    
  }

  inputSearch(text: string){
    if(text == ''){
      this.ngOnInit();
    }
    else{
      this.Products = this.Products.filter(product =>{
        return (
          product.pid.toString().toLocaleLowerCase()
          .includes(this.searchInput.toLowerCase())|| 
          product.brand.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          product.gen.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          product.description.toLocaleLowerCase().includes(this.searchInput.toLowerCase())||
          product.type.toLocaleLowerCase().includes(this.searchInput.toLowerCase())
        );
      });
    }
  }

  selectedMixProduct(id:string){

    //console.log("ID : ",id);
    this.display = true;

    this.productService.getProduct(id)
    .subscribe(( result : Product) =>
    {
      //console.log("RESULT : ",result);
      this.productRequest = result;
      // this.price_discount = result.price - (result.price * (result.discount/100));
      // this.IdMP = result.id;
      // this.store_PID = result.Pid;
    }
    )
  }

  showDetail(id:string){
    this.selectedMixProduct(id);
    this.visible = true;
  }

  deleteMixProduct(index : number, pid:string){
    // ลบสินค้าออกจากการจัดชุดหนึ่งชิ้น
    this.Basket.splice(index,1);
    this.Sale.splice(index,1);
    this.itemsInBasket--;
  }

  // checkTelPhone(tel:string){
  //   this.customerService.getCustomerByTel(tel)
  //   .subscribe(( result : Customer) =>
  //   {
  //     console.log('ลูกค้า : ',result);
  //     this.customerType = "สมาชิก";
  //     console.log("สมาชิก : ", this.customerType);
  //     return "สมาชิก";
  //   },(error) =>{
  //     console.log('ลูกค้าทั่วไปปปปปปปปปปปปป');
  //     this.customerType = "ลูกค้าทั่วไป";
  //     console.log("ลูกค้าทั่วไป : ", this.customerType);
  //     return "ลูกค้าทั่วไป";
  //   }
  //   );
  // }



}
