import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { accessTokenInfo } from '../model/accessTokenInfo.model';
import { LocalStorageRefService } from "./local-storage-ref.service";

interface MyData{
  accessToken:string;

}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  selectedOrg: string='';
  private _localStorage: Storage;

  private _myData$ = new BehaviorSubject<MyData>({
    accessToken: ''
  });
  myData$ = this._myData$.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService,private httpClient: HttpClient) {
    this._localStorage = _localStorageRefService.localStorage;
  }

  setInfo(data: MyData): void {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem("accessToken", jsonData);
    this._myData$.next(data);
  }

  loadInfo(): void {
    var localStorageData = this._localStorage.getItem("accessToken")
    const data = JSON.parse(localStorageData!);
    this._myData$.next(data);
  }

  clearInfo() {
    this._localStorage.removeItem("accessToken");
    this._myData$.next({} as MyData);
  }


  public addOrganisation(key: string, orgName: string): void {
    const orgs = this.getFromLocalStorage<string[]>(key) ?? [];
    orgs.push(orgName);

    this.saveToLocalStorage(key, orgs);
  }


  public getAllOrganaisations(): string[] {
    const org = this.getFromLocalStorage<string[]>('org1');
    if (org === undefined){
      return [];
    }
    return org;
  }

  public clearOrganisations(){
    this._localStorage.removeItem('org1')

  }

  public getFromLocalStorage<T>(key: string): T|undefined {
    const value = localStorage.getItem(key);
    if (value == undefined){
      return undefined;
    }
    return JSON.parse(value);
  }

  public saveToLocalStorage(key: string, value: any){
    var jValue = JSON.stringify(value);
    localStorage.setItem(key, jValue);
  }



}
