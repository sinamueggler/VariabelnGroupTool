import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { DevopsServiceService } from '../services/devops-service.service';
import { EventService } from '../services/event.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DesignComponent implements OnInit {
  variables: Observable<any[]> | undefined;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private localStorageService: LocalStorageService, private eventService: EventService) { }
  ngOnInit(): void {

    this.accessTokenSelected("valueselected");

  }
  accessTokenSelected(token: string) {

  }

  validAccessToken() {
    var accessTokenValidate = this.localStorageService.getFromLocalStorage("accessToken");
    if (!accessTokenValidate) {
      return false;
    }
    return true;

  }

}
