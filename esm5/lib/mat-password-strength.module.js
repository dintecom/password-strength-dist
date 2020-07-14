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
var MatPasswordStrengthModule = /** @class */ (function () {
    function MatPasswordStrengthModule() {
    }
    MatPasswordStrengthModule_1 = MatPasswordStrengthModule;
    MatPasswordStrengthModule.forRoot = function () {
        return {
            ngModule: MatPasswordStrengthModule_1,
            providers: []
        };
    };
    var MatPasswordStrengthModule_1;
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
    return MatPasswordStrengthModule;
}());
export { MatPasswordStrengthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJsaWIvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1FQUFtRSxDQUFDO0FBQy9HLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDZFQUE2RSxDQUFDO0FBQzdILE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDZFQUE2RSxDQUFDO0FBRzdILDZCQUE2QjtBQUM3QixPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtRUFBbUUsQ0FBQztBQUMvRyxPQUFPLEVBQ0wsZ0NBQWdDLEVBQ2pDLE1BQU0sNkVBQTZFLENBQUM7QUFDckYsT0FBTyxFQUFDLGdDQUFnQyxFQUFDLE1BQU0sNkVBQTZFLENBQUM7QUFDN0gsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsWUFBWTtBQUNaLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQXNCekQ7SUFBQTtJQU9BLENBQUM7a0NBUFkseUJBQXlCO0lBQzdCLGlDQUFPLEdBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLDJCQUF5QjtZQUNuQyxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztJQU5VLHlCQUF5QjtRQXBCckMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osb0JBQW9CO2dCQUNwQixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsZUFBZTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDUCw0QkFBNEI7Z0JBQzVCLGdDQUFnQztnQkFDaEMsZ0NBQWdDO2FBQ2pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUE0QjtnQkFDNUIsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7YUFDakM7WUFDRCxlQUFlLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNwRCxDQUFDO09BQ1cseUJBQXlCLENBT3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRQcm9ncmVzc0Jhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7TWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuXG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50JztcbmltcG9ydCB7TWF0UGFzc3dvcmRTdHJlbmd0aEluZm9Db21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvL21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvLmNvbXBvbmVudCc7XG5pbXBvcnQge01hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQnO1xuXG5cbi8vIEV4cG9ydCBtb2R1bGUncyBwdWJsaWMgQVBJXG5leHBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50JztcbmV4cG9ydCB7XG4gIE1hdFBhc3N3b3JkU3RyZW5ndGhJbmZvQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvL21hdC1wYXNzd29yZC1zdHJlbmd0aC1pbmZvLmNvbXBvbmVudCc7XG5leHBvcnQge01hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS9tYXQtcGFzcy10b2dnbGUtdmlzaWJpbGl0eS5jb21wb25lbnQnO1xuZXhwb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoVmFsaWRhdG9yfSBmcm9tICcuL3ZhbGlkYXRvci9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtdmFsaWRhdG9yJztcbi8vIHZhbGlkYXRvclxuZXhwb3J0IHtSZWdFeHBWYWxpZGF0b3J9IGZyb20gJy4vdmFsaWRhdG9yL3JlZ2V4cC5jbGFzcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0UGFzc3dvcmRTdHJlbmd0aENvbXBvbmVudCxcbiAgICBNYXRQYXNzd29yZFN0cmVuZ3RoSW5mb0NvbXBvbmVudCxcbiAgICBNYXRQYXNzVG9nZ2xlVmlzaWJpbGl0eUNvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50LFxuICAgIE1hdFBhc3N3b3JkU3RyZW5ndGhJbmZvQ29tcG9uZW50LFxuICAgIE1hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW01hdFBhc3NUb2dnbGVWaXNpYmlsaXR5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYXNzd29yZFN0cmVuZ3RoTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRQYXNzd29yZFN0cmVuZ3RoTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==