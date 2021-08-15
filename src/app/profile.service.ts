import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile';
import { catchError } from 'rxjs/operators';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProfileService {

  private apiUrl = 'http://localhost:3000/profiles'; // apin osoite
  //private apiUrl = 'https://warm-lowlands-87442.herokuapp.com/students'; // адрес серверной части, когда привязали ее к heruku
  constructor(private http: HttpClient) { } // HttpClientin DI

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return (error.message || error);
  }
  // Kaikkien opiskelijoiden haku. Palauttaa observablena opiskelijataulukon
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Opiskelijan haku id:n perusteella. Palauttaa observablena opiskelijan.
  
  getStudent(id: number): Observable<Profile> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Profile>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  /** POST: lisätään opiskelija palvelimelle.
   * Studentin tyyppi on any, koska _id puuttuu eikä noudateta student.ts:n mallia.
   * _id jätetään pois opiskelijaa lisättaessä, koska Mongo lisää sen automaattisesti
  */
 /* addStudent(student: any): Observable<Student> {
    // serveri vaatii tokenin jotta kannan muokkaus olisi mahdollista
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    student.token = mytoken.token; // pistetään token bodyn mukana
    return this.http.post<Student>(this.apiUrl, student, headers)
      .pipe(
        catchError(this.handleError)
      );
  }
  /** PUT: Päivitetään opiskelija id:n perusteella. */
  /*updateStudent(student: any): Observable<Student> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    student.token = mytoken.token; // pistetään token bodyn mukana
    const url = `${this.apiUrl}/${student._id}`;
    return this.http.put<Student>(url, student, headers).pipe(
      catchError(this.handleError)
    );
  }

  /** DELETE: Poistetaan opiskelija id:n perusteella.
   *  Token laitettu menemään headerin mukana*/
  
 delStudent(id: string): Observable<Profile> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = { headers: new HttpHeaders({ 'x-access-token': mytoken.token }) };
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Profile>(url, tokenheaders).pipe(
      catchError(this.handleError)
    );
  }
}