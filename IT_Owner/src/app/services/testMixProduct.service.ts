import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { testMixProduct } from '../model/testMixProduct';

@Injectable({
    providedIn: 'root'
  })

export class TestMixProductService {

API_URL = 'https://localhost:7239/api/MixProduct';

constructor(private http : HttpClient) { }

getAlltestMixProduct() : Observable<testMixProduct[]>
{
  return this.http.get<testMixProduct[]>(this.API_URL);
}

addtestMixProduct(addmixProductRequest: testMixProduct) : Observable<testMixProduct>{
  addmixProductRequest.id = '00000000-0000-0000-0000-000000000000';
  return this.http.post<testMixProduct>(this.API_URL, addmixProductRequest);
}

gettestMixProduct(id:string) : Observable<testMixProduct> {
  return this.http.get<testMixProduct>(this.API_URL + '/' + id);
}

getMixProductByStatus(status:string) : Observable<testMixProduct[]> {
  return this.http.get<testMixProduct[]>(this.API_URL + '/status/' + status);
}

updatetestMixProduct(id:string, updateMixProduct: testMixProduct ) : Observable<testMixProduct>{
  return this.http.put<testMixProduct>(this.API_URL + '/' + id, updateMixProduct);
}

deletetestMixProduct(id:string): Observable<testMixProduct>{
  return this.http.delete<testMixProduct>(this.API_URL + '/' + id);
}

}
