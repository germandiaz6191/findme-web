import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { UserDto } from 'src/app/model/login/userDto';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { Content } from 'src/app/model/services-information/content';
import { InformationService } from 'src/app/model/services-information/informationService';
import { Pagination } from 'src/app/model/services-information/pagination';
import { CookieService } from 'src/app/services/cookies/cookie.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-result-findme',
  templateUrl: './result-findme.component.html',
  styleUrls: ['./result-findme.component.scss']
})
export class ResultFindmeComponent implements OnInit {

  // COOKIES
  cookie: string;
  user: number;

  pageSize = 10;
  pageIndex = 1;
  totalPage = 0;
  totalElements = 0;

  resultStatusService: string = null;
  object: LostObjectsDto;
  saveSearchlostObjectsDto:LostObjectsDto = null;
  responseLostObjectsDto: Array<LostObjectsDto> = [];

  constructor(private cookieService: CookieService, private objectProvider: ObjectsService,
    private usersService: UsersService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.cookie = this.cookieService.getCookie('and0U2Vzc2lvbg');
    this.user = parseInt(this.cookieService.getCookie('aWRVc2Vy'));
    this.getDataService();

    this.getObjects(0);
    
  }

  getDataService() {
    this.object = this.objectProvider.getLostObject();
  }

  getDataComplete(item: LostObjectsDto) {
    this.resultStatusService = null;
    
    const user = new UserDto();
    user.id = this.user;
    item.status = 2;
    
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService();
    informationService.requestId = id.getTime();
    informationService.operationName = 'get data complete';
         
    const request = new Content();
    request.informationService = informationService;
    request.content = this.user;

    this.resultStatusService = null;
     this.usersService.getUserDataComplete(this.cookie, request).subscribe(
       data => {
         console.log(data);
          console.log('Ejecuta formualrio');
       }, error => {
         console.log(error);
         if (error.status === 404) {
          this.resultStatusService = 'No tiene terminos y condiciones o información adicional';
         }else if (error.status === 400) {
           console.log('Se presentó un error de comunicación');
           this.resultStatusService = 'Se presentó un error de comunicación.';
         } else {
           console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
           this.resultStatusService = 'Se presentó un error de comunicación.';
         }
       }
     );
  }

  onPageChange(event: any, page: number): void {
    console.log(page);
    if (event.target.className === 'icon-arrow-right') {
      this.pageIndex = this.pageIndex + 1;
      this.getObjects(this.pageIndex);
    } else if (this.pageIndex > 0 && this.pageIndex !== this.totalPage) {
        this.pageIndex = this.pageIndex - 1;
        this.getObjects(this.pageIndex);
    }
  }

  getObjects(page: number) {
    this.spinner.show();
    this.resultStatusService = null;
    this.saveSearchlostObjectsDto = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'get Objects';
    
    const pagination = new Pagination();
    pagination.page = page;
    pagination.size = this.pageSize;

    let lostObjectsDto: LostObjectsDto = this.object;
    
    if(lostObjectsDto.keywords.length==0 && (lostObjectsDto.identityobject == undefined || lostObjectsDto.identityobject == '')){
      this.spinner.hide();
      this.resultStatusService = "Se debe ingresar por lo menos el identificador o una palabra clave";
      return;
    }

    if(lostObjectsDto.sectors.length==0){
      this.spinner.hide();
      this.resultStatusService = "Se debe ingresar por lo menos el sector";
      return;
    }
 console.log(lostObjectsDto.identityobject);
    const request = new Content();
    request.informationService = informationService;
    request.pagination = pagination;
    request.content = lostObjectsDto;

    this.resultStatusService = null;
     this.objectProvider.getObjects(this.cookie, request)
     .pipe(finalize(() => {
          this.spinner.hide();
          //save search object
          const clonedLostObject  = Object.assign([], lostObjectsDto);
          clonedLostObject.rsimagecloud = null;
          this.saveSearchlostObjectsDto = clonedLostObject;
          
        }))
     .subscribe({
          next: (data) => {
            console.log(data);

            this.totalElements = data.body.pagination.totalElements * data.body.pagination.totalPage;
            this.totalPage = data.body.pagination.totalPage;

            if(data.body.content != null && data.body.content.length > 0){
              this.responseLostObjectsDto = data.body.content;                        
            }else{
              this.resultStatusService = 'No se encontraron resultados';
              this.totalElements = 0;
              this.totalPage = 0
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
            this.totalElements = 0;
            this.totalPage = 0
          }
      });


     this.objectProvider.setLostObject(lostObjectsDto);
  }

  showSection(action: String){
    this.router.navigate([action]);
  }
}
