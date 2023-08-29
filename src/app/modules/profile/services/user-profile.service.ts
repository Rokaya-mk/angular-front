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
export class UserProfileService {
  user: any | null = null;
  token = localStorage.getItem('token');
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
  options = { headers: this.headers };

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  editCustomerDetails(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.editCustomerDetails}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editCustomerImage(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.uploadCustomerImage}/${this.user.id}`;
    return this.http.post<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editFactoryDetails(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.editFactoryDetails}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editFactoryImages(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.uploadFactoryImages}/${this.user.id}`;
    return this.http.post<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editDriverDetails(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.editDriverDetails}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editDriverImages(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.uploadDriverImages}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editCompanyDetails(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.editCompanyDetails}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  editCompanyImages(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.editCompanyDetails}/${this.user.id}`;
    return this.http.put<any>(url, body, this.options).pipe(
      tap((response) => {
        // console.log(response);
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  sendOtp(phone: string): Observable<any> {
    const url = `${env.host}${ApiUrl.sendPasswordOtp}`;
    return this.http.post<any>(url, phone).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }

  verifyOtp(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.verifyPasswordOtp}`;

    return this.http.post<any>(url, body, this.options).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }

  resetPassword(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.resetPassword}`;

    return this.http.post<any>(url, body, this.options).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }

  getOrdersByUserId(): Observable<any> {
    const url = `${env.host}${ApiUrl.ordersByUserId}/${this.user.id}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      tap((response) => {
        // console.log(response);
        if (response) {

        }
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }
}
