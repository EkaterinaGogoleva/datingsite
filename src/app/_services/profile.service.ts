import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //добавили библиотеку асинхронного метода observable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../profile';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  private UsersUrl = 'http://localhost:8080/api/auth/user';
  private UsersnameUrl = 'http://localhost:8080/api/auth/user/username';
  private profilesUrl = 'http://localhost:8080/api/profiles';// apin osoite
private profilesnameUrl = 'http://localhost:8080/api/profiles/username';
//private apiUrl = 'https://warm-lowlands-87442.herokuapp.com/students'; адрес серверной части указать свой, когда привязали ее к heruku
 
//делает, чтобы данные возвращались в формате json
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

constructor(private messageService: MessageService,
  //c помощью объекта HTTP делаем запрос в сервис
   private http: HttpClient) { }
  // Virheenkäsittelymetodi joka palauttaa observablen
  /*private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }*/
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  };

getAll(): Observable<Profile[]> {
  return this.http.get<Profile[]>(this.UsersUrl)
  .pipe(
    catchError(this.handleError<Profile[]>('getAll', []))
  );
}
/*
create(data: any): Observable<any> {
  //попробовать потом указать второй адрес this.meUrl
  return this.http.post(this.profilesUrl, data, this.httpOptions);
}



//tutorial 4
get(id: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}/${id}`);
}*/
// было так ?usernamepublic=${usernamepublic} вместо /${usernamepublic}
findByUsername(usernamepublic: any): Observable<any> {
  return this.http.get(`${this.UsersnameUrl}/${usernamepublic}`).pipe(
    tap(_ => this.log(`fetched hero id=${usernamepublic}`)),
  catchError(this.handleError<Profile>(`findByUsername usernamepublic=${usernamepublic}`))
  );};
//пока изменение делаем как в туториале
update(username:any, data: any): Observable<any> {
  return this.http.put(`${this.UsersnameUrl}/${username}`, data);
}
//пока удаление делаем как в туториале
delete(id: any): Observable<any> {
  return this.http.delete(`${this.UsersUrl}/${id}`);
}

/* GET profile whose name contains search term 
searchProfile(term: string): Observable<Profile[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Profile[]>(`${this.profilesUrl}/?usernamepublic=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Profile[]>('searchProfiles', []))
  );
  
};*/
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


} 


