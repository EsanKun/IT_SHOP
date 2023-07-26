import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Owner_Nav',
  templateUrl: './Owner_Nav.component.html',
  styleUrls: ['./Owner_Nav.component.css']
})
export class Owner_NavComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['login']);
  }

}
