import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //добавили библиотеку асинхронного метода observable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../profile';



const profilesUrl = 'http://localhost:8080/api/profiles';// apin osoite
//private apiUrl = 'https://warm-lowlands-87442.herokuapp.com/students'; адрес серверной части указать свой, когда привязали ее к heruku
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 
constructor(private http: HttpClient) { }
  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }


getAll(): Observable<Profile[]> {
  return this.http.get<Profile[]>(profilesUrl)
  .pipe(
    catchError(this.handleError)
  );
}

create(data: any): Observable<any> {
  //попробовать потом указать второй адрес this.meUrl
  return this.http.post(profilesUrl, data);
}


//tutorial 4
get(id: any): Observable<any> {
  return this.http.get(`${profilesUrl}/${id}`);
}

//написала сама - поиск по имени
getUsername(username: any): Observable<any> {
  return this.http.get(`${profilesUrl}/${username}`);
}

// заменить на поиск по имени
findByUsername(username: any): Observable<any> {
  return this.http.get(`${profilesUrl}?username=${username}`);
}
//пока изменение делаем как в туториале
update(username:any, data: any): Observable<any> {
  return this.http.put(`${profilesUrl}/${username}`, data);
}
//пока удаление делаем как в туториале
delete(id: any): Observable<any> {
  return this.http.delete(`${profilesUrl}/${id}`);
}

} 


