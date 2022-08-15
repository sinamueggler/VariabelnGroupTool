import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { accessTokenInfo } from 'src/app/model/accessTokenInfo.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.css']
})

export class AccessTokenComponent implements OnInit {
  
  myInfo$ = this._localStorageService.myData$;


  form: FormGroup = this._fb.group({
    accessToken: ['', Validators.compose([Validators.required, Validators.minLength(20)])],
  });

  @Output()
  accessTokenSelected = new EventEmitter<string>();
  @Input()
  isActive: boolean | undefined;
  constructor(
    private _localStorageService: LocalStorageService,
    private _fb: FormBuilder,
 
  ) {}


  ngOnInit(): void {
    this.checkAccessTokenExist();

  }

  setInfo(inputValue: any) {

    if(!this.form.valid){
      alert('Form not valid');
      return;
    }

    const value = this.form.controls['accessToken'].value;
  
    this._localStorageService.setInfo({
      accessToken: value
    });

    this.accessTokenSelected.emit(value);
  }

  clearInfo() {
    this._localStorageService.clearInfo();
  }

  checkAccessTokenExist(){
    const token = this._localStorageService.getFromLocalStorage<accessTokenInfo>("accessToken")?.accessToken;
   if(token){
    this.form.get('accessToken')!.setValue(token);
   }
  }
  validAccessToken() {
    var accessTokenValidate = this._localStorageService.getFromLocalStorage("accessToken");
    if (!accessTokenValidate) {
      return false;
    }
    return true;

  }

}


 