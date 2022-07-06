import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { GrowDay, GrowDayStatusUpdatePayload, NewGrowDayPayload } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class GrowDaysService {
  constructor(private readonly http: HttpClient) {}

  getUserGrowDays(userId: string): Observable<GrowDay[]> {
    const url = `${environment.apiUrl}/grow-day/user/${userId}`;
    return this.http.get<GrowDay[]>(url);
  }

  getAllGrowDays(): Observable<GrowDay[]> {
    const url = `${environment.apiUrl}/grow-day`;
    return this.http.get<GrowDay[]>(url);
  }

  submitNewGrowDayRequest(payload: NewGrowDayPayload): Observable<GrowDay> {
    const url = `${environment.apiUrl}/grow-day`;
    return this.http.post<GrowDay>(url, payload);
  }

  deleteGrowDay(growDayId: string): Observable<void> {
    const url = `${environment.apiUrl}/grow-day/${growDayId}`;
    return this.http.delete<void>(url);
  }

  updateGrowDayStatus(growDayId: string, payload: GrowDayStatusUpdatePayload): Observable<GrowDay> {
    const url = `${environment.apiUrl}/grow-day/${growDayId}`;
    return this.http.put<GrowDay>(url, payload);
  }
}
