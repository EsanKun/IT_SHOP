import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesDetail } from '../model/SalesDetail';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailService {

  API_URL = 'https://localhost:7239/api/saleDetail';

constructor(private http : HttpClient) { }

getAllDetail() : Observable<SalesDetail[]>
{
  return this.http.get<SalesDetail[]>(this.API_URL);
}

addDetail(saleDetailRequest: SalesDetail) : Observable<SalesDetail>{
  saleDetailRequest.sDid = '00000000-0000-0000-0000-000000000000';
  return this.http.post<SalesDetail>(this.API_URL, saleDetailRequest);
}

getDetail(id:string) : Observable<SalesDetail> {
  return this.http.get<SalesDetail>(this.API_URL + '/' + id);
}

getAllDtailbySaleId(saleId:string) : Observable<SalesDetail[]> {
  return this.http.get<SalesDetail[]>(this.API_URL + '/saleId/' + saleId);
}

updateSaleDetail(id:string, updateDetail: SalesDetail ) : Observable<SalesDetail>{
  return this.http.put<SalesDetail>(this.API_URL + '/' + id, this.updateSaleDetail);
}

deleteSaleDetail(id:string): Observable<SalesDetail>{
  return this.http.delete<SalesDetail>(this.API_URL + '/' + id);
}

}
