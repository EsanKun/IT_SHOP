import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-Employee',
  templateUrl: './add-Employee.component.html',
  styleUrls: ['./add-Employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  showOption : boolean = false;

  emp_role:any[] = [
    {name : "พนักงานขายสินค้า"},
    {name : "พนักงานคงคลัง"}
  ];

  constructor() { }

  ngOnInit() {
  }

  setDropDown(){
    if(this.showOption == false){
      this.showOption = true;
    }else{
      this.showOption = false;
    }
  }

}
