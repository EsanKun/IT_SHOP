import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Sales } from '../model/Sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  API_URL = 'https://localhost:7239/api/Sale';

constructor(private http : HttpClient) { }

getAllSale() : Observable<Sales[]>
{
  return this.http.get<Sales[]>(this.API_URL);
}

addSale(saleRequest: Sales) : Observable<Sales>{
  saleRequest.sid = '00000000-0000-0000-0000-000000000000';
  return this.http.post<Sales>(this.API_URL, saleRequest);
}

getSale(id:string) : Observable<Sales> {
  return this.http.get<Sales>(this.API_URL + '/' + id);
}

updateSale(id:string, updateSale: Sales ) : Observable<Sales>{
  return this.http.put<Sales>(this.API_URL + '/' + id, updateSale);
}

deleteSale(id:string): Observable<Sales>{
  return this.http.delete<Sales>(this.API_URL + '/' + id);
}

}
