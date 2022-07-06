import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { UserDetails } from '../../models'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup
  teams$: Observable<string[]>;
  managers$: Observable<UserDetails[]>;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      team: ['', Validators.required],
      manager: ['', Validators.required],
      isManager: [false, Validators.required],
      location: [''],
      phone: [''],
    });
  }

  onAddUserClick(): void {

  }

}
