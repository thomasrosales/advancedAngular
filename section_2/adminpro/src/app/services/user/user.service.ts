import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../../config/config';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  userCreate(user: User){
    const url = `${BASE_URL}/user`;
    return this.http.post(url, user)
      .pipe(
        map((response: any) => {
          return response.user;
        })
      );
  }

  login(user: User, rememberMe: boolean){
    const url = `${BASE_URL}/login`;
    return this.http.post(url, user);
  }
}
