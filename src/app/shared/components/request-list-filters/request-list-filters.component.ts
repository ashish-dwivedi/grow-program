import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { RequestFilter } from '../../models';
import { RequestStatus, ResourceType } from '../../enums';

@Component({
  selector: 'app-request-list-filters',
  templateUrl: './request-list-filters.component.html',
  styleUrls: ['./request-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListFiltersComponent implements OnInit {
  filterForm: FormGroup;
  areFiltersExpanded = false;
  resourceTypes = Object.values(ResourceType);
  requestStatuses = Object.values(RequestStatus);

  @Output() filterChange = new EventEmitter<RequestFilter>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      title: [''],
      resourceType: [''],
      requestStatus: [''],
    });
    this.filterForm?.valueChanges.pipe(debounceTime(400)).subscribe((values) => {
      this.filterChange.emit(values);
    });
  }

  clearFilterField(filterField: 'all' | 'requestStatus' | 'resourceType' | 'title') {
    if (filterField === 'all') {
      this.filterForm.setValue({
        title: '',
        resourceType: '',
        requestStatus: '',
      });
      return;
    }
    this.filterForm?.get(filterField)?.setValue('');
  }

  toggleFiltersVisibility(): void {
    this.areFiltersExpanded = !this.areFiltersExpanded;
    this.changeDetectorRef.markForCheck();
  }

  getAppliedFilterCount(): number {
    return Object.keys(this.filterForm.value).filter((key) => !!this.filterForm.get(key)?.value)
      .length;
  }
}
