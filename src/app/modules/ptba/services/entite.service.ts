import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Entite} from '../models/entite';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  private _serviceUrl = environment.appUrl + '/api/entites';
  private _searchServiceUrl =  environment.appUrl + '/api/search/entites';
  private _defaultServiceUrl =  environment.appUrl + '/api/default/entites';
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

  getAll(): Observable<Entite[]> {
    return this.http.get<Entite[]>(`${this._serviceUrl}`);
  }

  search(keyWord: string): Observable<Entite[]> {
    return this.http.get<Entite[]>(`${this._searchServiceUrl}/${keyWord}`);
  }

  defaultList(): Observable<Entite[]> {
    return this.http.get<Entite[]>(`${this._defaultServiceUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this._serviceUrl}/${id}`);
  }

  add(payload: Entite): Observable<Entite> {
    const payloadtoken = {...payload, _token: 'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa'};
    const res = this.http.post<Entite>(`${this._serviceUrl}`, payload);
    return res;
  }

  update(payload: Entite, id: number): Observable<Entite> {
    return this.http.put<Entite>(`${this._serviceUrl}/${id}`, payload);
  }
}
