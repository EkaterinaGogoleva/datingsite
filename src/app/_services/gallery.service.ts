import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  private uploadUrl = 'http//localhost:8080/gallery';
  //private uploadUrl = 'https://datingsitenode1.herokuapp.com/gallery';
  constructor(
    private http: HttpClient) { }


    upload(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
  
      formData.append('file', file);
  //'https://datingsitenode1.herokuapp.com/gallery/upload'
      const req = new HttpRequest('POST', `${this.uploadUrl}/upload`, formData, {
        reportProgress: true,
        responseType: 'json'
      });
  
      return this.http.request(req);
    }
  //'https://datingsitenode1.herokuapp.com/gallery/files'
    getFiles(): Observable<any> {
      return this.http.get(`${this.uploadUrl}/files`);
    }

    }

