import { Component, OnInit } from '@angular/core';
import { Content } from '../../../../model/services-information/content';
import { InformationService } from 'src/app/model/services-information/informationService';
import { CookieService } from '../../../../services/cookies/cookie.service';
import { LocationService } from '../../../../services/location/location.service';
import { CountriesDTO } from 'src/app/model/location/countriesDto';
import { CitiesDto } from 'src/app/model/location/citiesDto';
import { SectorDto } from 'src/app/model/location/SectorDto';
import { DepartmentsDTO } from 'src/app/model/location/departmentsDTO';
import { KeywordsDto } from 'src/app/model/objects/keywordsDto';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { IpClientService } from 'src/app/services/ip-client/ip-client.service';
import { UserDto } from 'src/app/model/login/userDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss']
})
export class AddObjectComponent implements OnInit {

  isSubmit:boolean = false;
  // COOKIES
  cookie: string;
  user: number;
  resultStatusService: string = null;
  countriesDTO: Array<CountriesDTO> = null;

  valueSelectDepartments: Array<DepartmentsDTO> = null;
  valueSelectCities: Array<CitiesDto> = null;
  valueSelectSectors: Array<SectorDto> = null;

  codeDepartment: number;
  codeCity: number;
  codeSector: string;
  identity:string;
  keyword:string;
  ip: string;
  description:string;
  uploadFile: string;

  selectdKeywords: Array<KeywordsDto> = [];

  file: any;
  selectName: String = "Seleccione un archivo";

  constructor(private cookieService: CookieService, private locationProvider: LocationService, private objectProvider: ObjectsService, private ipClient: IpClientService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cookie = this.cookieService.getCookie('and0U2Vzc2lvbg');
    this.user = parseInt(this.cookieService.getCookie('aWRVc2Vy'));
    this.getCountriesAndDepartment();
    
    //Consulta la ip
    this.ipClient.getIp().subscribe(data => {
      this.ip = data.ip;
    });
  }

  getCountriesAndDepartment() {
    this.resultStatusService = null;
    const id = new Date();
    
    let countrie: Array<number> = [];
    countrie.push(1);

    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'get Countries and departments';
    
    const request = new Content();
    request.informationService = informationService;
    request.content = countrie;

    this.resultStatusService
     this.locationProvider.getCountriesAndDepartments(this.cookie, request).subscribe(
       data => {
         console.log(data);
         let countries: Array<CountriesDTO> = data.body.content;
         let departments: Array<DepartmentsDTO> = countries[0].departments;
         let cities: Array<CitiesDto> = departments[0].cities;
         let sectors: Array<SectorDto> = cities[0].sector;

         //values backup
         this.countriesDTO = countries; 
         //values for dropdown List
         this.valueSelectDepartments = departments;
         this.valueSelectCities = cities;
         this.valueSelectSectors = sectors;

         //values for ngmodel selected
         this.codeDepartment = departments[0].id;
         this.codeCity = cities[0].id;
         this.codeSector = sectors[0].id;

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

  changeDepartment(id: number, positionCard: number){
    console.log(positionCard);
    let department:Array<DepartmentsDTO> = this.countriesDTO[0].departments.filter(item => item.id == id);
    if(department != null && department.length>0 && department[0].cities != null && department[0].cities.length>0){
        this.valueSelectCities = department[0].cities;
        this.codeCity = this.valueSelectCities[0].id;

        this.valueSelectSectors = department[0].cities[0].sector != null ? department[0].cities[0].sector: null;
        this.codeSector = this.valueSelectSectors != null ? this.valueSelectSectors[0].id : null;
    }else{
        this.valueSelectCities = null;
        this.valueSelectSectors = null;
        this.codeCity = null;
        this.codeSector = null
      this.getCitiesByDeparment(id);
    }
  }

  changeCity(id: number, positionCard: number){
    console.log(positionCard);
    let cities:Array<CitiesDto> = null;
    this.countriesDTO[0].departments.forEach(item =>{
      if(item.cities != null){
        let itemCities:Array<CitiesDto> = item.cities.filter(item => item.id == id);
        if(itemCities != null){
          cities = itemCities;
          return;
        }
      }
    });

    if(cities != null && cities.length>0 && cities[0].sector !=null && cities[0].sector.length>0){
      this.valueSelectSectors = cities[0].sector; 
      this.codeSector = this.valueSelectSectors[0] != null ? this.valueSelectSectors[0].id:'';
  
    }else{
      this.valueSelectSectors = null; 
      this.codeSector = null;
      this.getSectorsByCity(id);
    }
  }

  getCitiesByDeparment(idDepartment: number) {
    this.resultStatusService = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'get Cities by department';
    
    let department: Array<number> = [];
    department.push(idDepartment);

    const request = new Content();
    request.informationService = informationService;
    request.content = department;

    this.resultStatusService
     this.locationProvider.getCitiesAndSector(this.cookie, request).subscribe(
       data => {
         console.log(data);
         let cities: Array<CitiesDto> = data.body.content;
         
         if(null != cities && cities.length>0){
          this.valueSelectCities = cities;
          this.codeCity = this.valueSelectCities[0].id;

          //save values response service
          this.countriesDTO.forEach(country => {
            country.departments.forEach(element => {
                if(element.id == idDepartment){
                  element.cities = cities;
                  return;
                }
             });
           });

           //if have sectors
           if(cities[0].sector != null && cities[0].sector.length>0){
            let sectors: Array<SectorDto> = cities[0].sector;
            this.valueSelectSectors = sectors;
            this.codeSector = this.valueSelectSectors[0].id;
           }
         }
         
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

  getSectorsByCity(idCity: number) {
    this.resultStatusService = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'get Sectors by city';
    
    let department: Array<number> = [];
    department.push(idCity);

    const request = new Content();
    request.informationService = informationService;
    request.content = department;
    
    this.resultStatusService
     this.locationProvider.getSectorsByCities(this.cookie, request).subscribe(
       data => {
         console.log(data);
         let city: Array<CitiesDto> = data.body.content;
         if(null != city && city.length>0 && city[0].sector != null && city[0].sector.length>0){
          
          this.valueSelectSectors = city[0].sector;
          this.codeSector = this.valueSelectSectors[0].id;
 
          //save values response service
          this.countriesDTO.forEach(country => {
           country.departments.forEach(department => {
                department.cities.forEach(element => {
                  if(element.id == idCity){
                    element.sector = this.valueSelectSectors;
                    return;
                  }
                });               
            });
          });
         }
         
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

  addKeyword(){
    let dto:KeywordsDto = new KeywordsDto();
    dto.word = this.keyword;
    this.selectdKeywords.push(dto);
  }

  onSubmit(){
    this.addObject();
  }

  addObject() {
    this.spinner.show();
    this.isSubmit = true;
    this.resultStatusService = null;
    const id = new Date();
    
    //Inicialización formulario
    const informationService = new InformationService
    informationService.requestId = id.getTime();
    informationService.operationName = 'add Objects';
    
    let sector:SectorDto = new SectorDto();
    sector.id = this.codeSector;
    let listSectors:Array<SectorDto> = []; 
    listSectors.push(sector);

    const userDto = new UserDto();
    userDto.id = this.user;
    
    let itemsKeywords = this.selectdKeywords;

    if(listSectors.length==0 && itemsKeywords.length==0){
      this.resultStatusService = "Se debe ingresar por lo menos un sector o palabra clave";
      return;
    }

    const lostObjectsDto = new LostObjectsDto();
    lostObjectsDto.sectors = listSectors;
    lostObjectsDto.identityobject = this.identity;
    lostObjectsDto.keywords = this.selectdKeywords;
    lostObjectsDto.description = this.description;
    lostObjectsDto.imagename =  "miniature.png";
    lostObjectsDto.rqimagecloud = this.uploadFile;
    lostObjectsDto.ipaddressreport = this.ip;
    lostObjectsDto.userReport = userDto;

    const request = new Content();
    request.informationService = informationService;
    request.content = lostObjectsDto;

    this.resultStatusService = null;
     this.objectProvider.addObject(this.cookie, request).pipe(
      finalize(() => {this.spinner.hide(); this.isSubmit = false;})
      ).subscribe({
       next: (data) => {
         console.log(data);
         if(data.body.content != null && data.body.content == 'Success'){
          this.resultStatusService = 'Se guardo éxitosamente';
         }else{
           this.resultStatusService = 'Error guardando, respuesta vacía';
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

  fileChange(files: any[]) {
    if (files && files.length > 0) {
      if(files[0].type == "image/png"){
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

}
