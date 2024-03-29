import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Pipe, ViewChild, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, pipe } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { VariablenGroupReference } from 'src/app/model/variablenGroupReference';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VariableListComponent } from './variable-list/variable-list.component';


@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  @ViewChild('displayList') displayList!: VariableListComponent;

  variables: Observable<VariablenGroupReference[]> | undefined;

  currentOrg1: string | undefined;
  project1: TeamProjectReference | undefined;
  currentOrg2: string | undefined;
  project2: TeamProjectReference | undefined;

  selection = new FormControl();

  constructor(private localStorageService: LocalStorageService,
    private eventService: EventService) { }


  ngOnInit(): void {
    this.currentOrg1 = this.localStorageService.getFromLocalStorage('selectedOrg1')!;
    this.project1 = this.eventService.getFromStorage('selectedProj1').name!;

    this.currentOrg2 = this.localStorageService.getFromLocalStorage('selectedOrg2')!;
    this.project2 = this.eventService.getFromStorage('selectedProj2').name!;

  }

  updateDisplayList(): void {

    this.displayList.loadVariables();
  }

}
