import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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

  constructor(
    private _localStorageService: LocalStorageService,
    private _fb: FormBuilder,
    //private form: FormGroup
  ) {}


  ngOnInit(): void {
    
   
    this._initForm();
  }

  private _initForm() {

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




}


 