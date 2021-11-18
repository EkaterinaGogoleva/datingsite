import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs'; 
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Profile } from '../profile';




@Injectable({
  providedIn: 'root'
})


export class ProfileService {// apin osoite
private UsersUrl = 'https://datingsitenode1.herokuapp.com/api/auth/user';
private ProfilesUrl = 'https://datingsitenode1.herokuapp.com/api/profiles';
private profilesnameUrl = 'https://datingsitenode1.herokuapp.com/api/profiles/username';


 
//делает, чтобы данные возвращались в формате json
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

constructor(
   private http: HttpClient) { }
  

getAll(): Observable<Profile[]> {
  return this.http.get<Profile[]>(this.UsersUrl)
  .pipe(
    catchError(this.handleError<Profile[]>('getAll', []))
  );
}

findByUsername(nickname: any): Observable<any> {
  return this.http.get(`${this.profilesnameUrl}/${nickname}`).pipe(
  catchError(this.handleError<Profile>(`findByUsername nickname=${nickname}`))
  );};

  findByUsname(username: any): Observable<any> {
    return this.http.get(`${this.ProfilesUrl}/usname/${username}`).pipe(
    catchError(this.handleError<Profile>(`findByUsname username=${username}`))
    );};

update(username:any, data: any): Observable<any> {
  return this.http.put(`${this.profilesnameUrl}/${username}`, data);
}

delete(username: any): Observable<Profile> {
  return this.http.delete<Profile>(`${this.ProfilesUrl}/${username}`).pipe(
    catchError(this.handleError<Profile>('deleteProfiles'))
  );
}

/*Tutorial 7
GET profile whose name contains search term */
searchProfile(nickname: string): Observable<Profile[]> {
  if (!nickname.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Profile[]>(`${this.ProfilesUrl}/search/${nickname}`).pipe(
    catchError(this.handleError<Profile[]>('searchProfiles', []))
  );
};


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

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

} 


