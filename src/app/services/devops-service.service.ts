import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { accessTokenInfo } from '../model/accessTokenInfo.model';
import { CollectionValue } from '../model/collectionValue.model';
import { TeamProjectReference } from '../model/teamProjectReference.model';
import { VariablenGroupReference } from '../model/variablenGroupReference';
import { EventService } from './event.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DevopsServiceService {

  constructor(private localstorageService: LocalStorageService, private httpClient: HttpClient, private eventService: EventService) { }

  private projectUrl = 'https://dev.azure.com/'


  public getProjects(org: string): Observable<CollectionValue<TeamProjectReference>> {

    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);


    return this.httpClient.get<CollectionValue<TeamProjectReference>>(this.projectUrl + org + '/_apis/projects?api-version=6.0', {
      headers: headers,
      responseType: 'json'
    }).pipe(
      shareReplay(1)
    );


  }

  public getVariables(org: string, project: TeamProjectReference): Observable<CollectionValue<VariablenGroupReference>> {

    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);


    return this.httpClient.get<CollectionValue<VariablenGroupReference>>(this.projectUrl + org + '/' + project + '/_apis/distributedtask/variablegroups?api-version=7.1-preview.2', {
      headers: headers,
      responseType: 'json'
    }).pipe(
      shareReplay(1)
    );

  }

  public AddVariableGroup(org: string, varGroupName: any, projRef: TeamProjectReference): Observable<CollectionValue<VariablenGroupReference>> {
    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);
    headers = headers.set('Content-Type', 'application/json');

    var targetProj = this.eventService.getFromStorage('selectedProj2');



    return this.httpClient.post<CollectionValue<VariablenGroupReference>>(
      this.projectUrl + org + '/_apis/distributedtask/variablegroups?api-version=7.1-preview.2',
      JSON.stringify({
        responseType: "json",
        type: varGroupName.type,
        description: varGroupName.description,
        name: varGroupName.name,
        variableGroupProjectReferences: [
          {
            projectReference: {
              id: targetProj.id,
              projectName: targetProj.name
            },
            name: varGroupName.name,
          }
        ],
        variables: varGroupName.variables

      }),
      { 'headers': headers }
    )



  }

  


  
  public PutUpdateVariableGroup(org: string, groupId: string, varGroupName: any,): Observable<CollectionValue<VariablenGroupReference>> {

    const json = this.localstorageService.getFromLocalStorage<accessTokenInfo>("accessToken");
    var b64Token = btoa(':' + json?.accessToken ?? '');

    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + b64Token);
    headers = headers.set('Content-Type', 'application/json');

    var targetProj = this.eventService.getFromStorage('selectedProj2');


    return this.httpClient.put<CollectionValue<VariablenGroupReference>>(
      this.projectUrl + org + '/' + '_apis/distributedtask/variablegroups/' + groupId + '?api-version=7.1-preview.2',
      JSON.stringify({
        responseType: "json",
        type: varGroupName.type,
        name: varGroupName.name,
        variableGroupProjectReferences: [
          {
            projectReference: {
              id: targetProj.id,
              projectName: targetProj.name
            },
            name: varGroupName.name,
          }
        ],
        variables: varGroupName.variables

      }),
      { 'headers': headers }
    )

  }
}
