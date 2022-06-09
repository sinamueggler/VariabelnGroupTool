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

  
  selectedProject: TeamProjectReference| undefined;

  projects: Observable<TeamProjectReference[]>| undefined;

  constructor( 
    private localStorageService: LocalStorageService, 
    private devopsService: DevopsServiceService,
    private eventService: EventService) { }

  ngOnInit(): void {
    console.log('init proj list');
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


      this.selectedProject= this.eventService.getSelectedProjectReference(); 
  }

  onSelect(){
    if(this.selectedProject){

      this.eventService.setSelectedProjectReference(this.selectedProject)
    }

  }



}
