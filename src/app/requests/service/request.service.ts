import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {
  Request,
  RequestFilter,
  RequestUpdate,
  RequestUpdatePayload,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  getRequestsByCurrentUser(
    filters?: RequestFilter
  ): Observable<Request[]> {
    const filterString = filters
      ? Object.keys(filters)
          .filter((filter) => !!(filters as any)[filter])
          .map((filter) => `${filter}=${(filters as any)[filter]}`)
          .join('&')
      : '';
    const url = `${environment.apiUrl}/request/by-current-user?${filterString}`;
    return this.http.get<Request[]>(url);
  }

  getAllRequests(
    filters?: RequestFilter
  ): Observable<Request[]> {
    const filterString = filters
      ? Object.keys(filters)
          .filter((filter) => !!(filters as any)[filter])
          .map((filter) => `${filter}=${(filters as any)[filter]}`)
          .join('&')
      : '';
    const url = `${environment.apiUrl}/request?${filterString}`;
    return this.http.get<Request[]>(url);
  }

  deleteResourceRequest(resourceRequestId: string): Observable<void> {
    const url = `${environment.apiUrl}/request/${resourceRequestId}`;
    return this.http.delete<void>(url);
  }

  getRequestDetailsById(id: string): Observable<Request> {
    const url = `${environment.apiUrl}/request/${id}`;
    return this.http.get<Request>(url);
  }

  getUpdatesByRequestId(id: string): Observable<RequestUpdate[]> {
    const url = `${environment.apiUrl}/resource-request-update/${id}`;
    return this.http.get<RequestUpdate[]>(url);
  }

  saveUpdatesByRequest(
    payload: RequestUpdatePayload
  ): Observable<RequestUpdate> {
    const url = `${environment.apiUrl}/resource-request-update`;
    return this.http.post<RequestUpdate>(url, payload);
  }
}
