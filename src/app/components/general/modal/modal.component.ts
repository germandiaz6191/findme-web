import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title;
  @Input() content;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  dismiss(cont: any){
    this.activeModal.dismiss(cont);
  }
  

}
