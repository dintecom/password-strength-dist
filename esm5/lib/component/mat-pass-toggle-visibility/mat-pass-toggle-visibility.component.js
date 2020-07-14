import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
var MatPassToggleVisibilityComponent = /** @class */ (function () {
    function MatPassToggleVisibilityComponent() {
        this._type = 'text';
    }
    Object.defineProperty(MatPassToggleVisibilityComponent.prototype, "type", {
        get: function () {
            return this.isVisible ? 'text' : 'password';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], MatPassToggleVisibilityComponent.prototype, "isVisible", void 0);
    MatPassToggleVisibilityComponent = __decorate([
        Component({
            selector: 'mat-pass-toggle-visibility',
            template: "<button (click)=\"isVisible = !isVisible\"\n        type=\"button\"\n        class=\"mat-icon-button cdk-focused cdk-mouse-focused\" mat-icon-button\n        matRippleCentered=\"true\"\n        matRipple>\n  <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>\n</button>\n\n",
            encapsulation: ViewEncapsulation.None,
            styles: [""]
        })
    ], MatPassToggleVisibilityComponent);
    return MatPassToggleVisibilityComponent;
}());
export { MatPassToggleVisibilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVVsRTtJQUFBO1FBS0UsVUFBSyxHQUFTLE1BQU0sQ0FBQztJQU12QixDQUFDO0lBSkMsc0JBQUksa0RBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFORDtRQURDLEtBQUssRUFBRTt1RUFDVztJQUhSLGdDQUFnQztRQU41QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLGdUQUEwRDtZQUUxRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQztPQUNXLGdDQUFnQyxDQVc1QztJQUFELHVDQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgVHlwZSA9ICd0ZXh0JyB8ICdwYXNzd29yZCcgO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1wYXNzLXRvZ2dsZS12aXNpYmlsaXR5LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFzc1RvZ2dsZVZpc2liaWxpdHlDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcblxuICBfdHlwZTogVHlwZSA9ICd0ZXh0JztcblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUgPyAndGV4dCcgOiAncGFzc3dvcmQnO1xuICB9XG5cbn1cbiJdfQ==