import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { ApiUrl } from 'src/app/shared/enums/apiUrl';

import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  user: any | null = null;
  token = localStorage.getItem('token');
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
  options = { headers: this.headers };

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  sendSupportMessage(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.supportMessage}`;
    return this.http.post<any>(url, body, this.options).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }
}
