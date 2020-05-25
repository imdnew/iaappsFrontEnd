import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Objectifstrategique} from '../models/objectifstrategique';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ObjectifstrategiqueService {

  private _serviceUrl =  environment.appUrl + '/api/objectifstrategiques';
  private _searchServiceUrl =  environment.appUrl + '/api/search/objectifstrategiques';
  private _defaultServiceUrl =  environment.appUrl + '/api/default/objectifstrategiques';
  private _httpOptions;


  constructor(private http: HttpClient) {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'X-XRSF-TOKEN ': 'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa',
      })
    };
  }

  getAll(): Observable<Objectifstrategique[]> {
    return this.http.get<Objectifstrategique[]>(`${this._serviceUrl}`);
  }

  search(keyWord: string): Observable<Objectifstrategique[]> {
    return this.http.get<Objectifstrategique[]>(`${this._searchServiceUrl}/${keyWord}`);
  }

  defaultList(): Observable<Objectifstrategique[]> {
    return this.http.get<Objectifstrategique[]>(`${this._defaultServiceUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this._serviceUrl}/${id}`);
  }

  add(payload: Objectifstrategique): Observable<Objectifstrategique> {
    const payloadtoken = {...payload, _token: 'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa'};
    const res = this.http.post<Objectifstrategique>(`${this._serviceUrl}`, payload);
    return res;
  }

  update(payload: Objectifstrategique, id: number): Observable<Objectifstrategique> {
    return this.http.put<Objectifstrategique>(`${this._serviceUrl}/${id}`, payload);
  }
}
