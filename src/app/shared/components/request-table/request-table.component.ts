import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Request } from '../../models';
import { getIconForRequestType, isRequestCompleted } from '../../utils';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestTableComponent {
  isRequestCompleted = isRequestCompleted;
  getIconForRequestType = getIconForRequestType;

  @Input() displayedColumns: string[];
  @Input() dataSource: Request[];

  @Output() rowClicked: EventEmitter<Request> = new EventEmitter<Request>();
  @Output() deleteResourceRequestClicked: EventEmitter<Request> = new EventEmitter<Request>();

  onDeleteResourceRequestClick(resourceRequest: Request, event: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.deleteResourceRequestClicked.emit(resourceRequest);
  }

  onResourceRequestRowClick(resourceRequest: Request): void {
    this.rowClicked.emit(resourceRequest);
  }
}
