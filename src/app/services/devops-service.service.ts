import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { accessTokenInfo } from '../model/accessTokenInfo.model';
import { CollectionValue } from '../model/collectionValue.model';
import { TeamProjectReference } from '../model/teamProjectReference.model';
import { VariablenGroupReference } from '../model/variablenGroupReference';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DevopsServiceService {

  constructor(private localstorageService: LocalStorageService, private httpClient: HttpClient) { }

  private projectUrl = 'https://dev.azure.com/'

  public getProjects(org: string): Observable<CollectionValue<TeamProjectReference>> {

    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);


    return this.httpClient.get<CollectionValue<TeamProjectReference>>(this.projectUrl + org +'/_apis/projects?api-version=6.0', {
      headers: headers,
      responseType: 'json'
    }).pipe(
      shareReplay(1)
    );


  }

  public getVariables(org: string, project: TeamProjectReference):Observable<any> {

    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);


    return this.httpClient.get<any[]>(this.projectUrl+org+'/'+project+'/_apis/distributedtask/variablegroups?api-version=7.1-preview.2', {
      headers: headers,
      responseType: 'json'
    });

  }

  public UpdateVariableGoups(org: string, project: TeamProjectReference, varId: VariablenGroupReference ){
    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);


    return this.httpClient.put<any[]>(this.projectUrl+org+'/'+project+'/_apis/distributedtask/variablegroups/' +varId +'?api-version=7.1-preview.2', {
      headers: headers,
      responseType: 'json'
    });
  }


}
