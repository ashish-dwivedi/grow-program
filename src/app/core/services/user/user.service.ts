import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserDetails } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUserDetailsBySubjectId(subject: string): Observable<UserDetails> {
    if (!subject) {
      return throwError(() => new Error('Subject id is required'));
    }
    const url = `${environment.apiUrl}/users/${subject}/details`;
    return this.http.get<UserDetails>(url);
  }

  getAllUserDetails(): Observable<UserDetails[]> {
    const url = `${environment.apiUrl}/users`;
    return this.http.get<UserDetails[]>(url);
  }

  resetBudget(userId: string): Observable<UserDetails> {
    const url = `${environment.apiUrl}/users/reset-budget/${userId}`;
    return this.http.post<UserDetails>(url, {});
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.delete<void>(url);
  }
}
