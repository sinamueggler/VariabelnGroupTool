import { Component, Input, NgModule, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Input()
  organization:string|undefined;

  @Input()
  saveName: string|undefined;
  
  previousValue: string|undefined;

  selectedProject1: TeamProjectReference| undefined;
  selectedProject2: TeamProjectReference| undefined;

  projects: Observable<TeamProjectReference[]>| undefined;

  constructor( 
    private localStorageService: LocalStorageService, 
    private devopsService: DevopsServiceService,
    private eventService: EventService) { }

  ngOnInit(): void {
    console.log('init proj list');

    this.previousValue = this.eventService.getFromStorage(this.saveName!);

    this.loadProjects();
  }

  loadProjects(): void {
    if(!this.organization){
      alert('No valid organization or project');
      return;
    }
    this.projects = this.devopsService.getProjects(this.organization)
    .pipe(
      map(x=> x.value)
    );


    //  this.selectedProject1= this.eventService.getSelectedProjectReference(); 
  }

  onSelectProj(event: TeamProjectReference){
    if(this.selectedProject1){

      this.eventService.addToStorage(this.saveName!, {name: event.name, id: event.id});

      var sdasda = this.eventService.getFromStorage(this.saveName!);
      console.log(this.saveName! + ': '+ this.eventService.getFromStorage(this.saveName!) );
      // this.eventService.setSelectedProjectReference(this.selectedProject)
    }

  }






}
