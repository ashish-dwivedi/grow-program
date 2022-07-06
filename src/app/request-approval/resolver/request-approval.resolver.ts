import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Request } from '../../shared/models';
import { RequestApprovalService } from '../service/request-approval.service';

@Injectable({
  providedIn: 'root',
})
export class RequestApprovalResolver implements Resolve<Request[]> {
  constructor(private readonly approvalService: RequestApprovalService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request[]> {
    return this.approvalService.getAllApprovalPendingRequests();
  }
}
