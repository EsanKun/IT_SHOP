import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MixProduct } from '../model/onApprove';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  API_URL = 'https://localhost:7239/api/Approve';

constructor(private http : HttpClient) { }

getAllMixProduct() : Observable<MixProduct[]>
{
  return this.http.get<MixProduct[]>(this.API_URL);
}

addMixProduct(addmixProductRequest: MixProduct) : Observable<MixProduct>{
  addmixProductRequest.id = '00000000-0000-0000-0000-000000000000';
  return this.http.post<MixProduct>(this.API_URL, addmixProductRequest);
}

getMixProduct(id:string) : Observable<MixProduct> {
  return this.http.get<MixProduct>(this.API_URL + '/' + id);
}

updateMixProduct(id:string, updateMixProduct: MixProduct ) : Observable<MixProduct>{
  return this.http.put<MixProduct>(this.API_URL + '/' + id, updateMixProduct);
}

deleteMixProduct(id:string): Observable<MixProduct>{
  return this.http.delete<MixProduct>(this.API_URL + '/' + id);
}

}
