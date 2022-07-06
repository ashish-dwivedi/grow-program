import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string | undefined;
  @Input() backRoute: string | undefined;

  constructor(private readonly location: Location) {}

  ngOnInit(): void {}

  onBackClick() {
    this.location.back();
  }
}
