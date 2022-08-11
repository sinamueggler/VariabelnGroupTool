import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrganizationListComponent } from './organization-list/organization-list.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  OrganisationControl = new FormControl('', Validators.required);
  organisations: string[] = [];
  selectedorg: string | undefined;

  organization1: string|undefined;
  organization2: string| undefined;
 
  @Input()
  isActive: boolean | undefined;

  constructor(private httpClient: HttpClient,
       private localStorageService: LocalStorageService) { }

  ngOnInit() {
  

  }

  addOrganisation(org: string) {
    this.organisations.push(org);

  }
  clearOrganisations() {
    this.organisations = [];

  }
  validOrganisations() {
    var validOrg1 = this.localStorageService.getFromLocalStorage("selectedOrg1");
    var valigOrg2 = this.localStorageService.getFromLocalStorage("selectedOrg2");

    var org1Value = "selectedOrg1";
    var org2Value = "selectedOrg2";

    if (validOrg1 == org1Value || valigOrg2 == org2Value) {
      return false;
    }
    return true;
  }
}

