import { Component, Input, ViewEncapsulation } from '@angular/core';
export class MatPassToggleVisibilityComponent {
    constructor() {
        this._type = 'text';
    }
    get type() {
        return this.isVisible ? 'text' : 'password';
    }
}
MatPassToggleVisibilityComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-pass-toggle-visibility',
                template: "<button\n  (click)=\"isVisible = !isVisible\"\n  class=\"mat-icon-button cdk-focused cdk-mouse-focused\"\n  mat-icon-button\n  matRipple\n  matRippleCentered=\"true\"\n  matRipple\n  [attr.tabindex]=\"tabindex ? tabindex : null\"\n  type=\"button\"\n>\n  <mat-icon>{{ isVisible ? \"visibility\" : \"visibility_off\" }}</mat-icon>\n</button>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            },] }
];
MatPassToggleVisibilityComponent.propDecorators = {
    isVisible: [{ type: Input }],
    tabindex: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9wYXNzd29yZC1zdHJlbmd0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5L21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVVsRSxNQUFNLE9BQU8sZ0NBQWdDO0lBTjdDO1FBYUUsVUFBSyxHQUFTLE1BQU0sQ0FBQztJQU12QixDQUFDO0lBSkMsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUM5QyxDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLGtXQUEwRDtnQkFFMUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7d0JBR0UsS0FBSzt1QkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgVHlwZSA9ICd0ZXh0JyB8ICdwYXNzd29yZCcgO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFzc1RvZ2dsZVZpc2liaWxpdHlDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgdGFiaW5kZXg/OiBzdHJpbmc7XG5cbiAgX3R5cGU6IFR5cGUgPSAndGV4dCc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgfVxuXG59XG4iXX0=