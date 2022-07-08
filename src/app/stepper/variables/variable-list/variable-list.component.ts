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
  addVariablesToStorage: boolean|undefined;

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
      map(x=> {
        if(this.addVariablesToStorage){
          this.eventService.addToStorage("savedVariables", x.value);
        }
        return x.value;
      }),
    );

  }

  CopyVariableTotargetProject(){
    if(this.selectedOption){

      const targetVariables = this.eventService.getFromStorage("savedVariables");
     
      const foundVariable = targetVariables.find((v: any) => v.name === this.selectedOption?.name)

      if(foundVariable !== undefined){
        //update
        
        console.log('Updating variable...');
        this.devopsService.PutUpdateVariableGroup(this.organization!, foundVariable.id, this.selectedOption)
        .subscribe(x=> {
          console.log(x);
        })
      } else{
        //add
        console.log('Crating new variable...');

        this.devopsService.AddVariableGroup(this.organization!, this.selectedOption, this.project!)
        .subscribe(x=> {
          console.log(x);
        })
      }
      

    }
  }


  }

