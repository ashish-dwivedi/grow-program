import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBarComponent {
  @Input() type: 'warning' | 'info' | 'success' | 'error' = 'info';

  getIconBasedOnMessageType(): string {
    switch (this.type) {
      case 'success': return 'check';
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }
}
