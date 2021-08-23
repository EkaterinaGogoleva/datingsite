import { Injectable } from '@angular/core';
import { Profile } from '../profile';
import { Observable, of } from 'rxjs'; //добавили библиотеку асинхронного метода observable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //это адрес сервера, откуда получается информация. Имя берем из in-memore service return
profileUrl = 'api/profiles';  // URL to web api
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
constructor(private http: HttpClient) { }



getProfiles(): Observable<Profile[]> {
  return this.http.get<Profile[]>(this.profileUrl)
  /*.pipe(
    tap(_ => this.log('fetched osallistujat')),
    catchError(this.handleError<Osallistuja[]>('getOsallistujat', [])) );*/
}


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
   //console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
} 
  log(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
