import { Observable } from 'rxjs';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { UserDetails } from '../../models';
import { UserState } from '../../../core/store/user/user.state';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[resolvePermissions]',
})
export class ResolveRolesDirective implements OnInit {
  /**
   * partialMatchAllowed boolean is set to true if a partial match of permissions for an element is enough to render it.
   */
  @Input() resolvePermissionsPartialMatchAllowed = false;
  /**
   * resolvePermissions is an array of permissions that is needed for the current element to be rendered.
   */
  @Input() resolvePermissions: string[];

  userRoles: string[];
  @Select(UserState.userState) userState$: Observable<UserDetails>;

  constructor(
    private readonly store: Store,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  /**
   * Acquire the logged-in user permissions and utilize them to determine if user access is possible for the current element.
   * Add or remove the element correspondingly.
   */
  ngOnInit(): void {
    this.userState$.subscribe((userDetails: UserDetails) => {
      this.userRoles = userDetails?.roles;
      this.viewContainerRef.clear();
      if (this.isUserPermittedForAccess()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }

  /**
   * Checks if partial match is allowed, then checks if the user has any of the specified permission, else if the user has all the
   * permissions. Return the corresponding boolean.
   */
  isUserPermittedForAccess(): boolean {
    if (this.resolvePermissionsPartialMatchAllowed) {
      return this.userRoles.some((role) =>
        this.resolvePermissions.includes(role)
      );
    } else {
      return this.resolvePermissions.every((role) =>
        this.resolvePermissions.includes(role)
      );
    }
  }
}
