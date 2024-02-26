import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { ObjectsService } from 'src/app/services/objects/objects.service';

@Component({
  selector: 'app-find-by-identification',
  templateUrl: './find-by-identification.component.html',
  styleUrls: ['./find-by-identification.component.scss']
})
export class FindByIdentificationComponent implements OnInit {
  
  identity:string;
  object: LostObjectsDto;
  
  isEdit: Boolean;

  constructor(private objectProvider: ObjectsService, private activatedroute:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getParamsUri();
    this.getDataService();
  }

  getParamsUri(){
    this.activatedroute.queryParams
                      .subscribe(params => {
                            this.isEdit = params['edit']||false;
                      });
  }

  getDataService() {
    this.object = this.objectProvider.getLostObject();
    this.identity = this.object.identityobject;
  }

  showSection(action: String){
    this.saveObject();
    this.router.navigate([action]);
  }

  saveObject(){
    this.object.identityobject = this.identity;

    this.objectProvider.setLostObject(this.object);
  }

}

