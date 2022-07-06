import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Request, NewRequestPayload } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class NewRequestService {
  constructor(private readonly http: HttpClient) {}

  submitNewResourceRequest(
    payload: NewRequestPayload
  ): Observable<Request> {
    const url = `${environment.apiUrl}/request`;
    return this.http.post<Request>(url, payload);
  }
}
