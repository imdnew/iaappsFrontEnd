import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Stat} from './../models/stat';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatService {

  private _serviceUrl = 'http://localhost:8000/api/hotels';
  private _searchServiceUrl = 'http://localhost:8000/api/search/hotels';
  private _defaultServiceUrl = 'http://localhost:8000/api/default/hotels';
  private _httpOptions;


  constructor(private http: HttpClient) {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'X-XRSF-TOKEN ':'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa',
      })
    };
  }

  getAll(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this._serviceUrl}`);
  }

  search(keyWord: string): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this._searchServiceUrl}/${keyWord}`);
  }

  defaultList(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this._defaultServiceUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this._serviceUrl}/${id}`);
  }

  add(payload: Stat): Observable<Stat> {
    const  payloadtoken = { ...payload, _token: 'rENAh5cglyCUjs4jVq9erbO7MDjBhNk9LYLQWDLa' };
    const res = this.http.post<Stat>(`${this._serviceUrl}`, payload);
     return res;
  }

  update(payload: Stat, id: number): Observable<Stat> {
    return this.http.put<Stat>(`${this._serviceUrl}/${id}`, payload);
  }
}
