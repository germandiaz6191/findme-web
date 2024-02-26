import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IdentificationTypeDto } from 'src/app/model/login/identificationTypeDto';
import { TermnsAndConditionsDto } from 'src/app/model/login/termnsAndConditionsDto';
import { UserDetailDto } from 'src/app/model/login/userDetailDto';
import { UserDto } from 'src/app/model/login/userDto';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { Content } from 'src/app/model/services-information/content';
import { InformationService } from 'src/app/model/services-information/informationService';
import { CookieService } from 'src/app/services/cookies/cookie.service';
import { IpClientService } from 'src/app/services/ip-client/ip-client.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from '../../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/general/modal/modal.component';

const versionTermsnConditions = environment.versionTermsnConditions;

@Component({
  selector: 'app-add-aditional-information',
  templateUrl: './add-aditional-information.component.html',
  styleUrls: ['./add-aditional-information.component.scss']
})
export class AddAditionalInformationComponent implements OnInit {

    @Input() getLostObject:LostObjectsDto;
    // COOKIES
    cookie: string;
    user: number;
    resultStatusService: string = null;
    
    uploadFile: string;
    
    file: any;
    selectName: String = "Seleccione un archivo";

    identificationType: Array<IdentificationTypeDto> = null;

    versiontermnsconditions = 0;
    activeTermnsconditions = false;
    identitynumber = "";
    codeIdentityType = 1;
    lastnames = "";
    firstnames = "";
    ip="";

    stepShowForm: number = 0;
    
  constructor(private cookieService: CookieService, private service: UsersService, private ipClient: IpClientService, private spinner: NgxSpinnerService, private modalService: NgbModal) { }

  ngOnInit() {
    const identificationTypeCC:IdentificationTypeDto = new IdentificationTypeDto();
    identificationTypeCC.id = 1;
    identificationTypeCC.name = "Cédula ciudadania";
    const identificationTypeCE:IdentificationTypeDto = new IdentificationTypeDto();
    identificationTypeCE.id = 2;
    identificationTypeCE.name = "Cédula extranjería";

    this.identificationType = [];
    this.identificationType.push(identificationTypeCC);
    this.identificationType.push(identificationTypeCE);
    this.cookie = this.cookieService.getCookie('and0U2Vzc2lvbg');
    this.user = parseInt(this.cookieService.getCookie('aWRVc2Vy'));

    //Consulta la ip
    this.ipClient.getIp().subscribe(data => {
      this.ip = data.ip;
    });
  }

  onSubmit(){
    this.addInformation();
  }

  addInformation() {
    this.spinner.show();
    this.stepShowForm = 1;
    this.resultStatusService = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime(); 
    informationService.operationName = 'add Aditional Information';

    if(0 == this.versiontermnsconditions){
      this.spinner.hide();
      this.resultStatusService = 'Debe aceptar los términos y condiciones';
      return;
    }
    const termnsAndConditionsDto = new TermnsAndConditionsDto();
    termnsAndConditionsDto.id = Number(versionTermsnConditions);

    const listTermnsAndConditionsDto: Array<TermnsAndConditionsDto> = [];
    listTermnsAndConditionsDto.push(termnsAndConditionsDto);

    const userDetailDto = new UserDetailDto();
    userDetailDto.firstnames = this.firstnames;
    userDetailDto.lastnames = this.lastnames;
    userDetailDto.numberidcard = this.identitynumber;
    userDetailDto.typesidcard = this.codeIdentityType;
    userDetailDto.termnsAndConditions = listTermnsAndConditionsDto;
    userDetailDto.fileIdentity = this.uploadFile;
    userDetailDto.ipAddress = this.ip;

    //Inicialización User
    const userDto = new UserDto();
    userDto.id = this.user;
    userDto.userDetailDto = userDetailDto;
    
    const request = new Content();
    request.informationService = informationService;
    request.content = userDto;

     this.service.addDetailInformarionUser(this.cookie, request).pipe(
      finalize(() => this.spinner.hide())
      ).subscribe(
       data => {
         console.log(data);
         this.resultStatusService = 'Su información fue guardada éxitosamente';
         console.log("Respuesta exitosa solicitud");
         this.stepShowForm = 2;
       }, error => {
         console.log(error);
         if(error.status == "204"){
          console.log('El usuario no existe');
          this.resultStatusService = 'Se presentó un error de comunicación.';
         }
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

  fileChange(files: any[]) {
    if (files && files.length > 0) {
      if(files[0].type == "application/jpeg"){
        this.file = files[0];
        this.selectName = files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (event: any) => {
          console.log(event);
          this.uploadFile = reader.result.toString().split('base64,')[1];
        };
        reader.onerror = (error: any) => {
          console.log('Error: ', error);
        };
      }else{
        this.selectName = "Seleccione un archivo";
      }   
     }else{
      this.selectName = "Seleccione un archivo";
     }
  }

  openTermnsAndConditions() {
    this.activeTermnsconditions = true;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Aceptar términos y condiciones';
    modalRef.componentInstance.content = 'politicas';
  }

}
