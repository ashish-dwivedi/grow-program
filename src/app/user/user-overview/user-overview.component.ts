import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { UserDetails } from '../../shared/models';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOverviewComponent implements OnInit {
  user: UserDetails;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['userOverview'];
    this.changeDetectorRef.markForCheck();
  }
}
