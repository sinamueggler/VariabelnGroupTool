import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, Subject } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { VariablenGroupReference } from 'src/app/model/variablenGroupReference';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit {
  
  @Input()
  project: TeamProjectReference|undefined;

  @Input()
  organization: string|undefined;



  @Input()
  selectable: boolean|undefined;

  variables: Observable<VariablenGroupReference[]>| undefined;
  updatedVariables: string|undefined;
  selection= new FormControl();
  selectedOption: VariablenGroupReference | undefined;

  myELements: string[] = [];

  constructor( 
    private devopsService: DevopsServiceService,
    private eventService: EventService) { }

  ngOnInit(): void {

    this.eventService.getMyFirstSubjectObservable()
      .subscribe(x => this.myELements.push(x));


    this.loadVariables();
    // this.PutUpdateVariableGroup();
  }

  loadVariables(): void {
    if(!this.organization || !this.project){
      alert('No valid organization or project');
      return;
    }
    this.variables= this.devopsService.getVariables(this.organization, this.project)
    .pipe(
      map(x=> x.value),
    );

  }

  PutUpdateVariableGroup(){

    if(this.selectedOption){
      this.devopsService.PutUpdateVariableGroup(this.organization!, this.selectedOption.id);
    }


  }





}
  // SaveSelectedOption(event: VariablenGroupReference){
  //   if(this.selectedOption){
  //     this.eventService.addToStorage(this.selectedOption!, event.name);
  //   }

  // }


