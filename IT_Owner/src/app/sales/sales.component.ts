import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Sales } from '../model/Sales';
import { SalesDetail } from '../model/SalesDetail';
import { auditTime } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SaleService } from '../services/sale.service';
import { SaleDetailService } from '../services/saleDetail.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  date = new Date();
  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = this.onInput.pipe(auditTime(400));

  sales:Sales[]=[];

  salesDetail:SalesDetail[]=[]; //เก็บข้อมูลเมื่อมีการกดที่column sales

  totalPrice:number=0;

  constructor(private http : HttpClient,
    private saleService : SaleService,
    private saleDetailService : SaleDetailService
    ) { }

  ngOnInit() {
    this.saleService.getAllSale()
    .subscribe(( result : Sales[]) =>
    {
      console.log(result);
      this.sales = result;
    }
    )
  }

  remove(index : number){
    this.sales.splice(index,1);
  }

  inputSearch(text: string){
    console.log(text);
    this.onInput.emit(text);
    
  }
  
  show_salesDetail(id:string){
    console.log("id : ",id);
    this.saleDetailService.getAllDtailbySaleId(id)
    .subscribe(( result : SalesDetail[]) =>
    {
      console.log(result);
      this.salesDetail = result;
    }
    )
  }

  // show_salesDetail(id:string){
  //   console.log("id : ",id);
  //   this.saleDetailService.getDetail(id)
  //   .subscribe(( result : SalesDetail) =>
  //   {
  //     console.log(result);
  //     //this.salesDetail = result;
  //   }
  //   )
  // }

}
