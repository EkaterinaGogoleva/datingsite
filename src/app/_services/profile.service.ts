import { Injectable } from '@angular/core';
import { Observable, of, throwError  } from 'rxjs'; //добавили библиотеку асинхронного метода observable
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../profile';
import { delay, materialize, dematerialize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ProfileService {// apin osoite
private UsersUrl = 'http://localhost:8080/api/auth/user';
private ProfilesUrl = 'http://localhost:8080/api/profiles';
private profilesnameUrl = 'http://localhost:8080/api/profiles/username';
private fotoUrl = 'http://localhost:8080/api/foto';
//private apiUrl = 'https://warm-lowlands-87442.herokuapp.com/students'; адрес серверной части указать свой, когда привязали ее к heruku
 
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


//tutorial 4
/*get(id: any): Observable<any> {
  return this.http.get(`${this.profilesUrl}/${id}`);
}*/

findByUsername(usernamepublic: any): Observable<any> {
  return this.http.get(`${this.profilesnameUrl}/${usernamepublic}`).pipe(
  catchError(this.handleError<Profile>(`findByUsername usernamepublic=${usernamepublic}`))
  );};

  findByUsname(username: any): Observable<any> {
    return this.http.get(`${this.ProfilesUrl}/usname/${username}`).pipe(
    catchError(this.handleError<Profile>(`findByUsname username=${username}`))
    );};

//pitää update Profile ja Me, mutta nyt update vain Profile
update(username:any, data: any): Observable<any> {
  return this.http.put(`${this.profilesnameUrl}/${username}`, data);
}


  



//toimi väärin
delete(username: any): Observable<Profile> {
  return this.http.delete<Profile>(`${this.ProfilesUrl}/${username}`).pipe(
    catchError(this.handleError<Profile>('deleteProfiles'))
  );
}

/*Tour of Heroes 
GET profile whose name contains search term */
searchProfile(usernamepublic: string): Observable<Profile[]> {
  if (!usernamepublic.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  //возможно стоит здесь изменить ?usernamepublic=${term} на ${usernamepublic}
  return this.http.get<Profile[]>(`${this.ProfilesUrl}/search/${usernamepublic}`).pipe(
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
//***********upload images */
//Tutorial 7
/*– FormData is a data structure that can be used to store key-value pairs. We use it to build an object which corresponds to an HTML form with append() method.

– We set reportProgress: true to exposes progress events. Notice that this progress event are expensive (change detection for each event), so you should only use when you want to monitor it.

– We call the request(PostRequest) & get() method of HttpClient to send an HTTP POST & Get request to the Multiple Files Upload Rest server. */
upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', `${this.fotoUrl}/upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}
getFiles(): Observable<any> {
  return this.http.get(`${this.fotoUrl}/file`);
}






} 


