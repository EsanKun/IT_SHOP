import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Page_ProductComponent } from './Page_Product/Page_Product.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Page_CustomerComponent } from './Page_Customer/Page_Customer.component';
import { Page_EmployeeComponent } from './Page_Employee/Page_Employee.component';
import { SalesComponent } from './sales/sales.component';
import { SplitterModule } from 'primeng/splitter';
import { Page_onApproveComponent } from './Page_onApprove/Page_onApprove.component';
import { DropdownModule } from 'primeng/dropdown';
import { Add_EmployeeComponent } from './Add_Employee/Add_Employee.component';
import { Edit_EmployeeComponent } from './Edit_Employee/Edit_Employee.component';
import { Add_CustomerComponent } from './Add_Customer/Add_Customer.component';
import { Edit_CustomerComponent } from './Edit_Customer/Edit_Customer.component';
import { Add_ProductComponent } from './Add_Product/Add_Product.component';
import { Edit_ProductComponent } from './Edit_Product/Edit_Product.component';
import { Add_MixproductComponent } from './Add_Mixproduct/Add_Mixproduct.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { Edit_MixProductComponent } from './Edit_MixProduct/Edit_MixProduct.component';
import { Add_MixProduct2Component } from './Add_MixProduct2/Add_MixProduct2.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { LoginComponent } from './login/login.component';
import { OwnerComponent } from './Owner/Owner.component';
import { WarehouseComponent } from './Warehouse/Warehouse.component';
import { SalesclerkComponent } from './Salesclerk/Salesclerk.component';
import { Warehouse_NavComponent } from './Navbar/Sales_Nav/Warehouse_Nav/Warehouse_Nav.component';
import { Owner_NavComponent } from './Navbar/Sales_Nav/Owner_Nav/Owner_Nav.component';
import { Sales_NavComponent } from './Navbar/Sales_Nav/Sales_Nav.component';
import { Page_sellProductComponent } from './Page_sellProduct/Page_sellProduct.component';

@NgModule({
  declarations: [																				
    AppComponent,
      Page_ProductComponent,
      Page_CustomerComponent,
      Page_EmployeeComponent,
      SalesComponent,
      Page_onApproveComponent,
      Add_EmployeeComponent,
      Edit_EmployeeComponent,
      Add_CustomerComponent,
      Edit_CustomerComponent,
      Add_ProductComponent,
      Edit_ProductComponent,
      Add_MixproductComponent,
      Edit_MixProductComponent,
      Add_MixProduct2Component,
      LoginComponent,
      OwnerComponent,
      WarehouseComponent,
      SalesclerkComponent,
      Warehouse_NavComponent,
      Owner_NavComponent,
      Sales_NavComponent,
      Page_sellProductComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    PanelModule,
    TableModule,
    InputTextModule,
    SplitterModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    CardModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
