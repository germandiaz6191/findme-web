import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeywordsDto } from 'src/app/model/objects/keywordsDto';
import { LostObjectsDto } from 'src/app/model/objects/lostObjectsDto';
import { ObjectsService } from 'src/app/services/objects/objects.service';

@Component({
  selector: 'app-find-by-characteristics',
  templateUrl: './find-by-characteristics.component.html',
  styleUrls: ['./find-by-characteristics.component.scss']
})
export class FindByCharacteristicsComponent  implements OnInit {

  keyword:string;
  selectdKeywords: Array<KeywordsDto> = [];
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
    this.selectdKeywords = this.object.keywords;
  }

  addKeyword(){
    let dto:KeywordsDto = new KeywordsDto();
    dto.word = this.keyword;
    this.selectdKeywords.push(dto);
  }

  showSection(action: String){
    this.saveObject();
    this.router.navigate([action]);
  }

  saveObject(){
    this.object.keywords = this.selectdKeywords;

    this.objectProvider.setLostObject(this.object);
  }
}
