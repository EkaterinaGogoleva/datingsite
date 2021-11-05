//titorial 2
//This service sends signup, login HTTP POST requests to back-end.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../profile';

//путь к серверной части аутентификации
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, nickname: string,
     gender: string, date_of_birth: String, children: string, 
     marital_status: string, education: string, profession: string,
     about_myself: string
      ): Observable<any> {
    return this.http.post(AUTH_API + 'user', {
      username,
      email,
      password,
      nickname,
      gender,
      date_of_birth, 
      children, 
      marital_status, 
      education, 
      profession,
      about_myself
    }, httpOptions);
  };

  
}
