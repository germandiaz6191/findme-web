import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDto } from 'src/app/model/alert/alertDto';

@Component({
  selector: 'app-alert-navigator',
  templateUrl: './alert-navigator.component.html',
  styleUrls: ['./alert-navigator.component.scss']
})
export class AlertNavigatorComponent  implements OnInit {

  @Input() data: AlertDto;

  constructor(private router: Router) { }
  
  ngOnInit() {
  }

  showSection(action: String){
    this.router.navigate([action]);
  }
}
