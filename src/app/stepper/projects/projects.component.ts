import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, concat, empty, flatMap, map, merge, mergeMap, Observable, zip } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrganizationComponent } from '../organization/organization.component';
import { VariablesComponent } from '../variables/variables.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Observable<TeamProjectReference[]> | undefined;
  currentOrg1: string|undefined;
  currentOrg2: string|undefined;

  @Input()
  isActive: boolean|undefined;

  constructor(private localStorageService: LocalStorageService, 
    private eventService: EventService) { }

  ngOnInit(): void {

    this.currentOrg1 =this.localStorageService.getFromLocalStorage('selectedOrg1')!;

    this.currentOrg2 =this.localStorageService.getFromLocalStorage('selectedOrg2')!;
   
  }

  validProjects() {

    var validProj1 = this.eventService.getFromStorage("selectedProj1");
    var validProj2 = this.eventService.getFromStorage("selectedProj2");

    if (!validProj1 || !validProj2) {
      return false;
    }
    return true;
  }

  }


  



