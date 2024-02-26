import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', 'home-container.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectAdd(){
    this.router.navigate(['/addobject']);
  }

  redirectFind(){
    this.router.navigate(['/getobject']);
  }

}
