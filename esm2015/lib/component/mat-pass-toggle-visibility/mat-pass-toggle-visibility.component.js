import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let MatPassToggleVisibilityComponent = class MatPassToggleVisibilityComponent {
    constructor() {
        this._type = 'text';
    }
    get type() {
        return this.isVisible ? 'text' : 'password';
    }
};
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
export { MatPassToggleVisibilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVVsRSxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQUE3QztRQUtFLFVBQUssR0FBUyxNQUFNLENBQUM7SUFNdkIsQ0FBQztJQUpDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztDQUVGLENBQUE7QUFSQztJQURDLEtBQUssRUFBRTttRUFDVztBQUhSLGdDQUFnQztJQU41QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLGdUQUEwRDtRQUUxRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7S0FDdEMsQ0FBQztHQUNXLGdDQUFnQyxDQVc1QztTQVhZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG50eXBlIFR5cGUgPSAndGV4dCcgfCAncGFzc3dvcmQnIDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHknLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgX3R5cGU6IFR5cGUgPSAndGV4dCc7XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgfVxuXG59XG4iXX0=