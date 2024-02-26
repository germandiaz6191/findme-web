import { Component, OnInit } from '@angular/core';
import { EnumFormSections } from 'src/app/constants/enumFormSections';
import { AlertDto } from 'src/app/model/alert/alertDto';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { ObjectsService } from 'src/app/services/objects/objects.service';

@Component({
  selector: 'app-get-object',
  templateUrl: './get-object.component.html',
  styleUrls: ['./get-object.component.scss']
})
export class GetObjectComponent implements OnInit {

  alertDto:AlertDto = new AlertDto();
  enumFormSections = EnumFormSections;

  constructor(private objectProvider: ObjectsService) { }
  
  ngOnInit() {
    this.alertDto.title = 'Well done!'; 
    this.alertDto.content = 'Conoces el lugar donde perdiste tus cosas?.';
    this.alertDto.navigatorGo = '/addsector';
    this.alertDto.navigatorBack = '/identification';
    this.resetDataService();
     
  }

  resetDataService() {
    this.objectProvider.setLostObject(new LostObjectsDto());
  }
}
