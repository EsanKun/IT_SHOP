import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page_ProductComponent } from './Page_Product/Page_Product.component';
import { Page_CustomerComponent } from './Page_Customer/Page_Customer.component';
import { Page_EmployeeComponent } from './Page_Employee/Page_Employee.component';
import { SalesComponent } from './sales/sales.component';
import { Page_onApproveComponent } from './Page_onApprove/Page_onApprove.component';
import { AddEmployeeComponent } from './Page_Employee/add-Employee/add-Employee.component';
import { Add_EmployeeComponent } from './Add_Employee/Add_Employee.component';
import { Edit_EmployeeComponent } from './Edit_Employee/Edit_Employee.component';
import { Add_CustomerComponent } from './Add_Customer/Add_Customer.component';
import { Edit_CustomerComponent } from './Edit_Customer/Edit_Customer.component';
import { Add_ProductComponent } from './Add_Product/Add_Product.component';
import { Edit_ProductComponent } from './Edit_Product/Edit_Product.component';
import { Add_MixproductComponent } from './Add_Mixproduct/Add_Mixproduct.component';
import { Add_MixProduct2Component } from './Add_MixProduct2/Add_MixProduct2.component';
import { LoginComponent } from './login/login.component';
import { OwnerComponent } from './Owner/Owner.component';
import { WarehouseComponent } from './Warehouse/Warehouse.component';
import { SalesclerkComponent } from './Salesclerk/Salesclerk.component';
import { Page_sellProductComponent } from './Page_sellProduct/Page_sellProduct.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'owner', component: OwnerComponent, children:[
    {path:'', component: Page_EmployeeComponent},
    {path:'product', component: Page_ProductComponent},
    {path:'customer', component: Page_CustomerComponent},
    {path:'employee', component: Page_EmployeeComponent},
    {path:'sales', component:SalesComponent},
    {path: 'approve', component:Page_onApproveComponent},
    {path: 'employee/add', component:Add_EmployeeComponent},
    {path: 'employee/edit/:id', component:Edit_EmployeeComponent},
    {path: 'customer/add', component:Add_CustomerComponent},
    {path: 'customer/edit/:id', component:Edit_CustomerComponent},
    {path: 'product/add', component:Add_ProductComponent},
    {path: 'product/edit/:id', component:Edit_ProductComponent},
    {path: 'mixProduct', component:Add_MixproductComponent},
    {path: 'mixProduct/edit/:id', component:Add_MixproductComponent},
    {path: 'testmixProduct', component:Add_MixProduct2Component},
    {path: 'sellProduct', component:Page_sellProductComponent},
  ]},
  {path:'warehouse', component: WarehouseComponent, children:[
    {path:'', component: Page_ProductComponent},
    {path:'product', component: Page_ProductComponent},
    {path: 'product/add', component:Add_ProductComponent},
    {path: 'product/edit/:id', component:Edit_ProductComponent},
    {path:'mixProduct', component: Add_MixproductComponent},
  ]},
  {path:'saleclerk', component: SalesclerkComponent, children:[
    {path:'', component: Page_sellProductComponent},
    {path:'sales', component: SalesComponent},
    {path:'product', component: Page_ProductComponent},
    {path:'customer', component: Page_CustomerComponent},
    {path: 'customer/add', component:Add_CustomerComponent},
    {path: 'customer/edit/:id', component:Edit_CustomerComponent},
    {path: 'sellProduct', component:Page_sellProductComponent},

  ]},
  {path:'product', component: Page_ProductComponent},
  {path:'customer', component: Page_CustomerComponent},
  {path:'employee', component: Page_EmployeeComponent},
  {path:'sales', component:SalesComponent},
  {path: 'approve', component:Page_onApproveComponent},
  {path: 'employee/add', component:Add_EmployeeComponent},
  {path: 'employee/edit/:id', component:Edit_EmployeeComponent},
  {path: 'customer/add', component:Add_CustomerComponent},
  {path: 'customer/edit/:id', component:Edit_CustomerComponent},
  {path: 'product/add', component:Add_ProductComponent},
  {path: 'product/edit/:id', component:Edit_ProductComponent},
  {path: 'mixProduct', component:Add_MixproductComponent},
  {path: 'mixProduct/edit/:id', component:Add_MixproductComponent},
  {path: 'testmixProduct', component:Add_MixProduct2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
