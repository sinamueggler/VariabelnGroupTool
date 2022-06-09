import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, flatMap, map, merge, mergeMap, Observable, zip } from 'rxjs';
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

  projects: Observable<any[]> | undefined;
  // projectsB: Observable<any[]> | undefined;

  currentOrg1: string|undefined;
  currentOrg2: string|undefined;

  constructor(private localStorageService: LocalStorageService, private devopsService: DevopsServiceService) { }

  ngOnInit(): void {

    this.currentOrg1 =this.localStorageService.getFromLocalStorage('selectedOrg1')!;

    this.currentOrg2 =this.localStorageService.getFromLocalStorage('selectedOrg2')!;

    console.log('proj org 1: '+ this.currentOrg1);
    console.log('proj org 2: '+ this.currentOrg2);

  }
  public onSelectedProj(key: string, event: any) {
    this.localStorageService.saveToLocalStorage(key, event.srcElement.innerText);
  }



    // const currentOrg: string = this.localStorageService.getFromLocalStorage('selectedOrg1')!;
    // const org: string = this.localStorageService.getFromLocalStorage('selectedOrg2')!;

  

    // const projectsA: Observable<any[]> = this.devopsService.getProjects(currentOrg)
    //   .pipe(
    //     map(x => x.value as any[]),
    //   );


    // const projectsB: Observable<any[]> = this.devopsService.getProjects(org)
    //   .pipe(
    //     map(x => x.value as any[]),
    //   );
      
    //   if (org == currentOrg) {
    //      this.projects= projectsA;
   
    //    }
    //    else{
    //  this.projects = projectsB;

    //     //this.projectsB= projectsB;



    //    }
      
  
    // this.projects = zip(projectsB, projectsA)
    //   .pipe(
    //     map(x => x[0].concat(x[1]))
    //   );

  }


  



