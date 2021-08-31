import { Injectable } from '@angular/core';
import { Profile } from '../profile';
import { Observable, of } from 'rxjs'; //добавили библиотеку асинхронного метода observable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


//взято из meanfront
const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private meUrl = 'http://localhost:8080/api/me';
  private profilesUrl = 'http://localhost:8080/api/auth/user';// apin osoite
  //private apiUrl = 'https://warm-lowlands-87442.herokuapp.com/students'; адрес серверной части указать свой, когда привязали ее к heruku
  
constructor(private http: HttpClient) { }
  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }


getAll(): Observable<Profile[]> {
  return this.http.get<Profile[]>(this.profilesUrl)
  .pipe(
    catchError(this.handleError)
  );
}

create(data: any): Observable<any> {
  //попробовать потом указать второй адрес this.meUrl
  return this.http.post(this.profilesUrl, data);
}


//tutorial 4
get(id: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}/${id}`);
}

//написала сама - поиск по имени
getUsername(username: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}/${username}`);
}

// заменить на поиск по имени
findByUsername(username: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}?username=${username}`);
}
//пока изменение делаем как в туториале
update(username:any, data: any): Observable<any> {
  return this.http.put(`${this.profilesUrl}/${username}`, data);
}
//пока удаление делаем как в туториале
delete(id: any): Observable<any> {
  return this.http.delete(`${this.profilesUrl}/${id}`);
}

} 


