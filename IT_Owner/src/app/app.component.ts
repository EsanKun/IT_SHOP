import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'IT_Owner';

  value:number = 2;
  navbarfixed:boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll(){
    // if(window.scrollY > 100){
    //   this.navbarfixed = true;
    // }else{
    //   this.navbarfixed = false;
    // }
  }

  constructor(private router : Router){}

  ngOnInit(): void {
      
  }

  logout(){
    this.router.navigate(['login']);
  }
}
