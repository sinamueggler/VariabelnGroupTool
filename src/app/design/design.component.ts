import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DevopsServiceService } from '../services/devops-service.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit{
  variables: Observable<any[]>| undefined;


  constructor(private devopsService: DevopsServiceService, private localStorageService: LocalStorageService){}
  ngOnInit(): void {
    
  this.accessTokenSelected("valueselected");
  
  }


  accessTokenSelected(token: string){
    
  }

 
}
