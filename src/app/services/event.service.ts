import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TeamProjectReference } from '../model/teamProjectReference.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  private myFirstSubject = new Subject<string>();

  private selectedProjReference: undefined| TeamProjectReference;

  constructor() { }



  public submitToMySubject(value: string){
    this.myFirstSubject.next(value);
  }

  public getMyFirstSubjectObservable(): Observable<string> {
    return this.myFirstSubject;
  }
  public setSelectedProjectReference(proj: TeamProjectReference){

    this.selectedProjReference= proj;

  }

public getSelectedProjectReference(): TeamProjectReference|undefined{
  return this.selectedProjReference;

}

}
