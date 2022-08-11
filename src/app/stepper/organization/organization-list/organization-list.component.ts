import { Component, Input, OnInit } from '@angular/core';
import { DevopsServiceService } from 'src/app/services/devops-service.service';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})

export class OrganizationListComponent implements OnInit {
  
  @Input()
  organization:string[]|undefined;
  @Input()
  isActive: boolean | undefined;

  @Input()
  disable: boolean|undefined;

  constructor(private localStorageService: LocalStorageService ) { }

  ngOnInit(): void {
    this.onSelectedOrg1("selectedOrg1");
    this.onSelectedOrg2("selectedOrg2");
  }

  public onSelectedOrg1(event: string) {

   this.localStorageService.saveToLocalStorage('selectedOrg1', event);


  }
  public onSelectedOrg2(event: any) {

    this.localStorageService.saveToLocalStorage('selectedOrg2', event);

  }

 
}
