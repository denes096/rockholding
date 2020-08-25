import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { baseUrl } from './../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http:HttpClient, private router: Router) {}

  login( data ) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin': '*',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${baseUrl}login`, data, httpOptions).subscribe((result:any) => {
      this.loginStatus.next(true);
      localStorage.setItem('token', result.access_token);
      this.router.navigateByUrl('/ingatlan/lista');
    },
    (err: any) => {
      console.log(err.error.message);
    });
  }

  signup( data ) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${baseUrl}signup`, data, httpOptions).subscribe((result:any) => {
      this.loginStatus.next(true);
      localStorage.setItem('token', result.access_token);
      this.router.navigateByUrl('/ingatlan/lista');
    },
    (err: any) => {
      console.log(err.error.message);
    });;
  }

  checkLoginStatus(): boolean
  {
    return localStorage.getItem('token') != null;
  }

  logout()
  {
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn()
  {
    return this.loginStatus.asObservable();
  }
}
