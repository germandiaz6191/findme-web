import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { Content } from 'src/app/model/services-information/content';
import { InformationService } from 'src/app/model/services-information/informationService';
import { Pagination } from 'src/app/model/services-information/pagination';
import { CookieService } from 'src/app/services/cookies/cookie.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';

@Component({
  selector: 'app-add-made-search',
  templateUrl: './add-made-search.component.html',
  styleUrls: ['./add-made-search.component.scss']
})
export class AddMadeSearchComponent implements OnInit {

  constructor(private cookieService: CookieService, private objectProvider: ObjectsService) { }

  @Input() getLostObject:LostObjectsDto;

  // COOKIES
  cookie: string;
  user: number;
  resultStatusService: string = null;
  isSearch: boolean = false;

  ngOnInit() {
    this.cookie = this.cookieService.getCookie('and0U2Vzc2lvbg');
    this.user = parseInt(this.cookieService.getCookie('aWRVc2Vy'));
  }

  onSubmit(){
    this.saveObject();
  }

  saveObject() {
    this.resultStatusService = null;
    this.isSearch = true;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'add Search';
    
    const request = new Content();
    request.informationService = informationService;
    let saveData:LostObjectsDto = new LostObjectsDto();
    saveData.id = this.user;
    saveData.keywords = this.getLostObject.keywords;
    saveData.sectors = this.getLostObject.sectors;
    saveData.identityobject = this.getLostObject.identityobject;
    request.content = saveData;

    this.resultStatusService = null;
     this.objectProvider.addSearch(this.cookie, request)
     .pipe(finalize(() => this.isSearch = false))
     .subscribe({
       next: (data) => {
         console.log(data);
         if(data.body.content != null){
          this.resultStatusService = 'Se guardó la búsqueda éxitosamente, estaremos notificando cualquier coincidencia';
         }else{
           this.resultStatusService = 'No se encontraron resultados';
         }
       }, error: (error) => {
         console.log(error);
         if (error.status === 400) {
           console.log('Se presentó un error de comunicación');
           this.resultStatusService = 'Se presentó un error de comunicación.';
         } else {
           console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
           this.resultStatusService = 'Se presentó un error de comunicación.';
         }
       }
      });
  }
  
}
