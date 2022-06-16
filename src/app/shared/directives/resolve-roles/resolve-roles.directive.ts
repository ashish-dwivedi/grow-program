import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ActiveSessionState } from '../../../core/states';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[resolvePermissions]',
})
export class ResolvePermissionsDirective implements OnInit {
  /**
   * partialMatchAllowed boolean is set to true if a partial match of permissions for an element is enough to render it.
   */
  @Input() resolvePermissionsPartialMatchAllowed = false;
  /**
   * If permission to be checked needs to have an id as a suffix, supply the id as `matchIdSuffix`.
   */
  @Input() resolvePermissionsMatchIdSuffix = '';
  /**
   * resolvePermissions is an array of permissions that is needed for the current element to be rendered.
   */
  @Input() resolvePermissions: string[];
  /**
   * loggedInUserPermissions is the list of permissions possessed by the logged in user.
   */
  loggedInUserPermissions: string[] = [];
  @Select(ActiveSessionState.actualPermissions) actualPermissions$: Observable<string[]>;

  constructor(
    private readonly store: Store,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  /**
   * Acquire the logged in user permissions and utilize them to determine if user access is possible for the current element.
   * Add or remove the element correspondingly.
   */
  ngOnInit(): void {
    this.actualPermissions$.subscribe(actualPermissions => {
      this.loggedInUserPermissions = [].concat(actualPermissions);
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
      return this.resolvePermissions.some(permission => this.permissionMatchBasedOnSuffix(permission));
    } else {
      return this.resolvePermissions.every(permission => this.permissionMatchBasedOnSuffix(permission));
    }
  }

  /**
   * Function checks if the matchIdSuffix input is set or not. When set, it matches the user permissions with the required permission
   * suffixed with the id supplied e.g manage:channel_user:my-first-channel.
   * @param genericRequiredPermission is the generic name of the permission e.g manage:channel_user
   */
  permissionMatchBasedOnSuffix(genericRequiredPermission: string): boolean {
    const actualRequiredPermission =
      genericRequiredPermission + (this.resolvePermissionsMatchIdSuffix ? `:${this.resolvePermissionsMatchIdSuffix}` : '');
    return this.loggedInUserPermissions.findIndex(userPermission => userPermission.startsWith(actualRequiredPermission)) >= 0;
  }
}
