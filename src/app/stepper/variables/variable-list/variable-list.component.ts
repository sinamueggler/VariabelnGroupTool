import { Component, Input, OnInit, Output, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable,of,OperatorFunction, startWith, switchMap } from 'rxjs';
import { TeamProjectReference } from 'src/app/model/teamProjectReference.model';
import { VariablenGroupReference } from 'src/app/model/variablenGroupReference';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit {

  @Input()
  project: TeamProjectReference | undefined;

  @Input()
  organization: string | undefined;

  @Input()
  addVariablesToStorage: boolean | undefined;

  @Input()
  selectable: boolean | undefined;

  @Output()
  updateDisplayListEvent = new EventEmitter();

  search = new FormControl();
control = new FormControl();
  variables: Observable<VariablenGroupReference[]> | undefined;
  updatedVariables: string | undefined;
  selection = new FormControl();
  selectedOption: VariablenGroupReference | undefined;
  organization1: string | undefined;
  organization2: string | undefined;

  filter: string | undefined;

  

  constructor(
    private devopsService: DevopsServiceService,
    private eventService: EventService, private localstorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.loadVariables();
  }

  loadVariables(): void {
    if (!this.organization || !this.project) {
      alert('No valid organization or project');
      return;
    }
    this.variables = this.devopsService.getVariables(this.organization, this.project)
      .pipe(
        map(x => {
          if (this.addVariablesToStorage) {
            this.eventService.addToStorage("savedVariablesList", x.value);
          }
          return x.value;
        }),
      );

  }

  CopyVariableTotargetProject() {
    if (this.selectedOption) {

      const targetVariables = this.eventService.getFromStorage("savedVariablesList");

      this.organization1 = this.localstorageService.getFromLocalStorage("selectedOrg1");
      this.organization2 = this.localstorageService.getFromLocalStorage("selectedOrg2");


      const foundVariable = targetVariables.find((v: any) => v.name === this.selectedOption?.name)

      if (foundVariable !== undefined) {
        //update

        console.log('Updating variable...');
        this.devopsService.PutUpdateVariableGroup(this.organization2!, foundVariable.id, this.selectedOption)
          .subscribe(x => {
            console.log(x);
            this.updateDisplayListEvent.emit('');
          })
          this.successfulAlert('updated variable-group '+ foundVariable.name + ' successfully')
      } else {
        //add
          this.devopsService.AddVariableGroup(this.organization2!, this.selectedOption, this.project!)
            .subscribe(x => {
              console.log(x);

              var updatedTargetVariables: object[] = [];
              this.eventService.getFromStorage("savedVariablesList")
              .forEach(( x: object) => updatedTargetVariables.push(x));

              updatedTargetVariables.push(x);

              this.eventService.addToStorage("savedVariablesList", updatedTargetVariables)
              this.updateDisplayListEvent.emit('');
              this.successfulAlert('added new variablegroup successfully!');

              return;
            })

      }
    }
  }

  $search = this.search.valueChanges.pipe(
    startWith(null),
    debounceTime(200),
    switchMap((res: string) => {
      if (!res) return of(this.eventService.getFromStorage("savedVariablesList"));
      res = res.toLowerCase();
      return of(
        this.eventService.getFromStorage("savedVariablesList").filter((x: string) => x.toLowerCase().indexOf(res) >= 0)
      );
    })
  );
  // searchObject(option: any) {
  //   let value = this.control.value || [];
  //   if (option.selected) value.push(option.value);
  //   else value = value.filter((x: any) => x != option.value);
  //   this.control.setValue(value);
  // }
 


successfulAlert(key:string){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: key,
    showConfirmButton: false,
    timer: 1500
   } )
}


getFilteredList(variables: VariablenGroupReference[] | null): VariablenGroupReference[] | null {
  if(variables && this.filter){
    return variables.filter(x => x.name.toLocaleLowerCase().indexOf(this.filter!.toLowerCase()) >= 0)
  }
  return variables;
}

setFilter(filter: string) {
  this.filter = filter;
}

}

