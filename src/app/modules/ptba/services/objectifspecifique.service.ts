import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Objectifspecifique} from '../models/objectifspecifique';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ObjectifspecifiqueService {

  private _serviceUrl =  environment.appUrl + '/api/objectifspecifiques';
  private _searchServiceUrl =  environment.appUrl + '/api/search/objectifspecifiques';
  private _defaultServiceUrl =  environment.appUrl + '/api/default/objectifspecifiques';
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

  getAll(): Observable<Objectifspecifique[]> {
    return this.http.get<Objectifspecifique[]>(`${this._serviceUrl}`);
  }

  search(keyWord: string): Observable<Objectifspecifique[]> {
    return this.http.get<Objectifspecifique[]>(`${this._searchServiceUrl}/${keyWord}`);
  }

  defaultList(): Observable<Objectifspecifique[]> {
    return this.http.get<Objectifspecifique[]>(`${this._defaultServiceUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this._serviceUrl}/${id}`);
  }

  add(payload: Objectifspecifique): Observable<Objectifspecifique> {
    const payloadtoken = {...payload, _token: 'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa'};
    const res = this.http.post<Objectifspecifique>(`${this._serviceUrl}`, payload);
    return res;
  }

  update(payload: Objectifspecifique, id: number): Observable<Objectifspecifique> {
    return this.http.put<Objectifspecifique>(`${this._serviceUrl}/${id}`, payload);
  }
}
