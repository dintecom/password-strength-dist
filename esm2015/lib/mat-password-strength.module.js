var MatPasswordStrengthModule_1;
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPasswordStrengthComponent } from './component/mat-password-strength/mat-password-strength.component';
import { MatPasswordStrengthInfoComponent } from './component/mat-password-strength-info/mat-password-strength-info.component';
import { MatPassToggleVisibilityComponent } from './component/mat-pass-toggle-visibility/mat-pass-toggle-visibility.component';
// Export module's public API
export { MatPasswordStrengthComponent } from './component/mat-password-strength/mat-password-strength.component';
export { MatPasswordStrengthInfoComponent } from './component/mat-password-strength-info/mat-password-strength-info.component';
export { MatPassToggleVisibilityComponent } from './component/mat-pass-toggle-visibility/mat-pass-toggle-visibility.component';
export { MatPasswordStrengthValidator } from './validator/mat-password-strength-validator';
// validator
export { RegExpValidator } from './validator/regexp.class';
let MatPasswordStrengthModule = MatPasswordStrengthModule_1 = class MatPasswordStrengthModule {
    static forRoot() {
        return {
            ngModule: MatPasswordStrengthModule_1,
            providers: []
        };
    }
};
MatPasswordStrengthModule = MatPasswordStrengthModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MatProgressBarModule,
            MatCardModule,
            MatIconModule,
            MatRippleModule
        ],
        exports: [
            MatPasswordStrengthComponent,
            MatPasswordStrengthInfoComponent,
            MatPassToggleVisibilityComponent
        ],
        declarations: [
            MatPasswordStrengthComponent,
            MatPasswordStrengthInfoComponent,
            MatPassToggleVisibilityComponent
        ],
        entryComponents: [MatPassToggleVisibilityComponent]
    })
], MatPasswordStrengthModule);
export { MatPasswordStrengthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJsaWIvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSw2RUFBNkUsQ0FBQztBQUM3SCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSw2RUFBNkUsQ0FBQztBQUc3SCw2QkFBNkI7QUFDN0IsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sbUVBQW1FLENBQUM7QUFDL0csT0FBTyxFQUNMLGdDQUFnQyxFQUNqQyxNQUFNLDZFQUE2RSxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDZFQUE2RSxDQUFDO0FBQzdILE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLFlBQVk7QUFDWixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFzQnpELElBQWEseUJBQXlCLGlDQUF0QyxNQUFhLHlCQUF5QjtJQUNwQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsMkJBQXlCO1lBQ25DLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBUFkseUJBQXlCO0lBcEJyQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixhQUFhO1lBQ2IsZUFBZTtTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQLDRCQUE0QjtZQUM1QixnQ0FBZ0M7WUFDaEMsZ0NBQWdDO1NBQ2pDO1FBQ0QsWUFBWSxFQUFFO1lBQ1osNEJBQTRCO1lBQzVCLGdDQUFnQztZQUNoQyxnQ0FBZ0M7U0FDakM7UUFDRCxlQUFlLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztLQUNwRCxDQUFDO0dBQ1cseUJBQXlCLENBT3JDO1NBUFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0UHJvZ3Jlc3NCYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQge01hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuaW1wb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudCc7XG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhJbmZvQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50JztcblxuXG4vLyBFeHBvcnQgbW9kdWxlJ3MgcHVibGljIEFQSVxuZXhwb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudCc7XG5leHBvcnQge1xuICBNYXRQYXNzd29yZFN0cmVuZ3RoSW5mb0NvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby5jb21wb25lbnQnO1xuZXhwb3J0IHtNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkvbWF0LXBhc3MtdG9nZ2xlLXZpc2liaWxpdHkuY29tcG9uZW50JztcbmV4cG9ydCB7TWF0UGFzc3dvcmRTdHJlbmd0aFZhbGlkYXRvcn0gZnJvbSAnLi92YWxpZGF0b3IvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLXZhbGlkYXRvcic7XG4vLyB2YWxpZGF0b3JcbmV4cG9ydCB7UmVnRXhwVmFsaWRhdG9yfSBmcm9tICcuL3ZhbGlkYXRvci9yZWdleHAuY2xhc3MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQsXG4gICAgTWF0UGFzc3dvcmRTdHJlbmd0aEluZm9Db21wb25lbnQsXG4gICAgTWF0UGFzc1RvZ2dsZVZpc2liaWxpdHlDb21wb25lbnRcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0UGFzc3dvcmRTdHJlbmd0aENvbXBvbmVudCxcbiAgICBNYXRQYXNzd29yZFN0cmVuZ3RoSW5mb0NvbXBvbmVudCxcbiAgICBNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0UGFzc3dvcmRTdHJlbmd0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWF0UGFzc3dvcmRTdHJlbmd0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW11cbiAgICB9O1xuICB9XG59XG4iXX0=