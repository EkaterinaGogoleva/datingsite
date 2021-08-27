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
  private profilesUrl = 'http://localhost:8080/api/profiles';// apin osoite
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
  //cама указала два адреса, чтобы создавал и в profile и в user
  return this.http.post(this.profilesUrl, this.meUrl, data);
}


//tutorial 4
get(id: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}/${id}`);
}
// заменить на поиск по имени
findByGender(gender: any): Observable<any> {
  return this.http.get(`${this.apiUrl}?gender=${gender}`);
}

update(id: any, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}
delete(id: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

} 


