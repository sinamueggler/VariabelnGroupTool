import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, concat, flatMap, map, merge, mergeMap, Observable, zip } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
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
  // projectsB: Observable<any[]> | undefined;

  currentOrg1: string|undefined;
  currentOrg2: string|undefined;

  constructor(private localStorageService: LocalStorageService, private devopsService: DevopsServiceService) { }

  ngOnInit(): void {

    this.currentOrg1 =this.localStorageService.getFromLocalStorage('selectedOrg1')!;

    this.currentOrg2 =this.localStorageService.getFromLocalStorage('selectedOrg2')!;

    console.log(' org 1: '+ this.currentOrg1);
    console.log(' org 2: '+ this.currentOrg2);

  }
  // public onSelectedProj(key: string, event: any) {
  //   this.localStorageService.saveToLocalStorage(key, event.srcElement.innerText);
  // }


  }


  



