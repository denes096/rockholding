import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(private http:HttpClient) {}

  listEstate(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin': '*',
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(`${baseUrl}ingatlan/adatlap/${id}`, httpOptions);
  }

  listAllEstate(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin': '*',
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(`${baseUrl}ingatlan/lista`, httpOptions);
  }
}
