import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Request } from '../../shared/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestApprovalService {
  constructor(private readonly http: HttpClient) {}

  getAllApprovalPendingRequests(): Observable<Request[]> {
    const url = `${environment.apiUrl}/request`;
    return this.http.get<Request[]>(url);
  }
}
