import { Component, Input, OnInit } from '@angular/core';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { Content } from 'src/app/model/services-information/content';
import { InformationService } from 'src/app/model/services-information/informationService';
import { CookieService } from 'src/app/services/cookies/cookie.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-status-object',
  templateUrl: './change-status-object.component.html',
  styleUrls: ['./change-status-object.component.scss']
})
export class ChangeStatusObjectComponent implements OnInit {

  @Input() getLostObject:LostObjectsDto;

  // COOKIES
  cookie: string;
  user: number;
  resultStatusService: string = null;

    constructor(private cookieService: CookieService, private objectsService: ObjectsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cookie = this.cookieService.getCookie('and0U2Vzc2lvbg');
    this.user = parseInt(this.cookieService.getCookie('aWRVc2Vy'));
    this.changeStatus();
  }

  changeStatus() {
    this.spinner.show();
    this.resultStatusService = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'change Status';
    
    const request = new Content();
    request.informationService = informationService;
    request.content = this.getLostObject;

    this.resultStatusService
     this.objectsService.changeObjectStatus(this.cookie, request).pipe(
      finalize(() => this.spinner.hide())
      ).subscribe(
       data => {
         console.log(data);
         this.resultStatusService = 'Se ha cambiado el estado del objeto correctamente';
         
       }, error => {
         console.log(error);
         if (error.status === 400) {
           console.log('Se presentó un error de comunicación');
           this.resultStatusService = 'Se presentó un error de comunicación.';
         } else {
           console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
           this.resultStatusService = 'Se presentó un error de comunicación.';
         }
       }
     );
  }

}
