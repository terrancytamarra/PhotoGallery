import { Photo } from './../../modals/photo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  _baseUrl:string;
  constructor(private _http: HttpClient) { 
    this._baseUrl=environment.SERVICE_BASE_URL;
  }

  getPhotos(): Observable<any> 
  {
    return this._http.get(this._baseUrl+ "photos");
  }
}
