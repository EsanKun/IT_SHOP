import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

API_URL = "https://localhost:7239/api/Products"

constructor(private http : HttpClient) { }

getAllProduct() : Observable<Product[]>
{
  return this.http.get<Product[]>(this.API_URL);
}

addProduct(addProductRequest: Product) : Observable<Product>{
  addProductRequest.pid = '00000000-0000-0000-0000-000000000000';
  return this.http.post<Product>(this.API_URL, addProductRequest);
}

getProduct(id:string) : Observable<Product> {
  return this.http.get<Product>(this.API_URL + '/' + id);
}

getProductByType(type:string) : Observable<Product[]> {
  return this.http.get<Product[]>(this.API_URL + '/type/' + type);
}

getProductBySearch(search:string) : Observable<Product[]> {
  return this.http.get<Product[]>(this.API_URL + '/search?input=' + search);
}

updateProduct(id:string, updateProductRequest: Product ) : Observable<Product>{
  return this.http.put<Product>(this.API_URL + '/' + id, updateProductRequest);
}

deleteProduct(id:string): Observable<Product>{
  return this.http.delete<Product>(this.API_URL + '/' + id);
}


}
