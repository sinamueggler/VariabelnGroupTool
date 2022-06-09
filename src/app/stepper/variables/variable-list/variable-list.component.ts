import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, Subject } from 'rxjs';
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
  project: string|undefined;

  @Input()
  organization: string|undefined;

  variables: Observable<any[]>| undefined;
  selection= new FormControl();

  myELements: string[] = [];

  constructor(
    private localStorageService: LocalStorageService, 
    private devopsService: DevopsServiceService,
    private eventService: EventService) { }

  ngOnInit(): void {

    this.eventService.getMyFirstSubjectObservable()
      .subscribe(x => this.myELements.push(x));


    this.loadVariables();
  }

  onBtnClick(){
    this.eventService.submitToMySubject('Hello from ' + this.project);
  }

  loadVariables(): void {
    if(!this.organization || !this.project){
      alert('No valid organization or project');
      return;
    }
    const variables: Observable<any[]>= this.devopsService.getVariables(this.organization, this.project)
    .pipe(
      map(x=> x.value as any[]),
    );

      this.variables= variables;
     

  }

}
