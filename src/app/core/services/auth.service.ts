import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { ApiUrl } from 'src/app/shared/enums/apiUrl';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  countryCode = '+20';
  private _token: string | null = null;
  loggedInStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  headers!: HttpHeaders;
  options!: { headers: HttpHeaders };

  constructor(private http: HttpClient, private userService: UserService) {
    const loggedInStatus = localStorage.getItem('loggedInStatus') === 'true';
    this.loggedInStatus = new BehaviorSubject<boolean>(loggedInStatus);
    this.initializeHeadersAndOptions();
  }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    localStorage.setItem('token', value || '');

    this.initializeHeadersAndOptions();
  }

  private initializeHeadersAndOptions(): void {
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.options = { headers: this.headers };
  }

  getLoginStatus(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  login(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.login}`;

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        // console.log(response);
        if (response.success) {
          localStorage.setItem('loggedInStatus', 'true');
          this.loggedInStatus.next(true);
          this.token = response.data.token;

          const user = response.data.user;
          this.userService.setUser(user);
        } else {
          localStorage.setItem('loggedInStatus', 'false');
          this.loggedInStatus.next(false);
        }
        return of(response);
      }),
      // catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('loggedInStatus');
    this.loggedInStatus.next(false);
    localStorage.removeItem('token');
    this.userService.clearUser();
  }

  signupPersonal(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.customerSignup}`;

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('loggedInStatus', 'true');
          this.loggedInStatus.next(true);
          this.token = response.data.token;

          const user = response.data.user;
          this.userService.setUser(user);
        } else {
          localStorage.setItem('loggedInStatus', 'false');
          this.loggedInStatus.next(false);
        }
        return of(response);
      }),
      // catchError((error) => {
      //   console.log(error);
      //   return error;
      // })
    );
  }

  signupFactory(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.factorySignup}`;

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('loggedInStatus', 'true');
          this.loggedInStatus.next(true);
          this.token = response.data.token;

          const user = response.data.user;
          this.userService.setUser(user);
        } else {
          localStorage.setItem('loggedInStatus', 'false');
          this.loggedInStatus.next(false);
        }
        return of(response);
      }),
      // catchError((error) => {
      //   console.log(error);
      //   return error;
      // })
    );
  }

  signupDriver(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.driverSignup}`;

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('loggedInStatus', 'true');
          this.loggedInStatus.next(true);
          this.token = response.data.token;

          const user = response.data.user;
          this.userService.setUser(user);
        } else {
          localStorage.setItem('loggedInStatus', 'false');
          this.loggedInStatus.next(false);
        }
        // return of(response);
      }),
      // catchError((error) => {
      //   console.log(error);
      //   return error;
      // })
    );
  }

  signupCompany(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.companySignup}`;

    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        if (response.success) {
          localStorage.setItem('loggedInStatus', 'true');
          this.loggedInStatus.next(true);
          this.token = response.data.token;

          const user = response.data.user;
          this.userService.setUser(user);
        } else {
          localStorage.setItem('loggedInStatus', 'false');
          this.loggedInStatus.next(false);
        }
        // return of(response);
      }),
      // catchError((error) => {
      //   console.log(error);
      //   return error;
      // })
    );
  }

  registerDriverDetails(infoBody: any, imagesBody: any): Observable<any> {
    const infoUrl = `${env.host}${ApiUrl.registerDriverInfo}`;
    const imagesUrl = `${env.host}${ApiUrl.uploadDriverImages}`;

    return this.http.post<any>(infoUrl, infoBody).pipe(
      tap((response) => {
        if (response.success) {
          console.log('Step 1 submitted successfully:', response);
          this.http.post<any>(imagesUrl, imagesBody).pipe(
            tap((response) => {
              if (response.success) {
                console.log('Step 2 submitted successfully:', response);
              }
            })
          ).subscribe();
        }
      })
    );
  }

  sendOtp(phone: string): Observable<any> {
    const url = `${env.host}${ApiUrl.sendOtp}`;
    return this.http.post<any>(url, phone, this.options!).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }

  verifyOtp(body: any): Observable<any> {
    const url = `${env.host}${ApiUrl.verifyOtp}`;

    return this.http.post<any>(url, body, this.options!).pipe(
      tap((response) => {
        if (response.success) {
          // console.log(response);
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
