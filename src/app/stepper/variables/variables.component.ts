import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {
  variables: Observable<any[]>| undefined;

  currentOrg1: string|undefined;
  project1: string|undefined;
  currentOrg2: string|undefined;
  project2: string|undefined;

  selection= new FormControl();

  constructor(private localStorageService: LocalStorageService, private devopsService: DevopsServiceService) { }


  ngOnInit(): void {
    this.currentOrg1 =this.localStorageService.getFromLocalStorage('selectedOrg1')!;
    this.project1 = this.localStorageService.getFromLocalStorage('selectedProj1')!;

    this.currentOrg2 =this.localStorageService.getFromLocalStorage('selectedOrg2')!;
    this.project2 = this.localStorageService.getFromLocalStorage('selectedProj2')!;
  }


  loadVariables(org: string, proj: string): void {

    const currentOrg: string =this.localStorageService.getFromLocalStorage(org)!;
    const project: string = this.localStorageService.getFromLocalStorage(proj)!;
    
    const projectA: Observable<any[]>= this.devopsService.getVariables(currentOrg, project)
    .pipe(
      map(x=> x.value as any[]),
    );

      this.variables= projectA;
     

  }

  



}
