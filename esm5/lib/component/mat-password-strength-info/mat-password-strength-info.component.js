import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { animate, animateChild, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake } from '../../animations/index';
var MatPasswordStrengthInfoComponent = /** @class */ (function () {
    function MatPasswordStrengthInfoComponent() {
        this.enableScoreInfo = false;
        this.lowerCaseCriteriaMsg = 'contains at least one lower character';
        this.upperCaseCriteriaMsg = 'contains at least one upper character';
        this.digitsCriteriaMsg = 'contains at least one digit character';
        this.specialCharsCriteriaMsg = 'contains at least one special character';
        this.customCharsCriteriaMsg = 'contains at least one custom character';
    }
    MatPasswordStrengthInfoComponent.prototype.ngOnInit = function () {
        if (!this.minCharsCriteriaMsg) {
            this.minCharsCriteriaMsg = "contains at least " + this.passwordComponent.min + " characters";
        }
    };
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "passwordComponent", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "enableScoreInfo", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "lowerCaseCriteriaMsg", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "upperCaseCriteriaMsg", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "digitsCriteriaMsg", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "specialCharsCriteriaMsg", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "customCharsCriteriaMsg", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthInfoComponent.prototype, "minCharsCriteriaMsg", void 0);
    MatPasswordStrengthInfoComponent = __decorate([
        Component({
            selector: 'mat-password-strength-info',
            exportAs: 'matPasswordStrengthInfo',
            template: "<mat-card @list>\n  <mat-card-content>\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLowerCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneLowerCaseLetter; then done else error\" @flipY>\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{lowerCaseCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableUpperCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneUpperCaseLetter; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{upperCaseCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableDigitRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneDigit; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{digitsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableSpecialCharRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneSpecialChar; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{specialCharsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLengthRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastMinChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{minCharsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.customValidator\">\n      <div *ngIf=\"passwordComponent.containAtCustomChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{customCharsCriteriaMsg}}</span>\n    </div>\n\n    <div *ngIf=\"enableScoreInfo\" class=\"info-row\" @items>\n      <div *ngIf=\"passwordComponent.strength === 100; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>Password's strength = {{passwordComponent.strength}} %100</span>\n    </div>\n\n  </mat-card-content>\n</mat-card>\n",
            animations: [
                // nice stagger effect when showing existing elements
                trigger('list', [
                    transition(':enter', [
                        // child animation selector + stagger
                        query('@items', stagger(300, animateChild()))
                    ]),
                ]),
                trigger('items', [
                    // cubic-bezier for a tiny bouncing feel
                    transition(':enter', [
                        style({ transform: 'scale(0.5)', opacity: 0 }),
                        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(1)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                    ]),
                ]),
                trigger('positiveState', [
                    transition(':enter', [
                        style({ 'backface-visibility': 'visible' }),
                        animate('{{ timing }}s {{ delay }}s ease-in', keyframes([
                            style({
                                opacity: 0,
                                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                                offset: 0,
                            }),
                            style({
                                opacity: 1,
                                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                                offset: 0.4,
                            }),
                            style({
                                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                                offset: 0.6,
                            }),
                            style({
                                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                                offset: 0.8,
                            }),
                            style({
                                transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                                offset: 1,
                            }),
                        ])),
                    ], { params: { timing: 1, delay: 0, rotateX: 1, rotateY: 0 } }),
                ]),
                trigger('negativeState', [
                    transition(':enter', useAnimation(shake)),
                ]),
            ],
            styles: ["mat-card{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;box-sizing:border-box;display:-webkit-box;display:flex;place-content:stretch center;-webkit-box-align:stretch;align-items:stretch;-webkit-box-flex:1;flex:1 1 0}mat-card mat-card-content{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;display:-webkit-box;display:flex;max-width:100%;place-content:stretch flex-start;-webkit-box-align:stretch;align-items:stretch}mat-card mat-card-content mat-icon{margin-right:10px}mat-card mat-card-content .info-row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}"]
        })
    ], MatPasswordStrengthInfoComponent);
    return MatPasswordStrengthInfoComponent;
}());
export { MatPasswordStrengthInfoComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9wYXNzd29yZC1zdHJlbmd0aC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMvSCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUF1RTdDO0lBQUE7UUFNRSxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4Qix5QkFBb0IsR0FBRyx1Q0FBdUMsQ0FBQztRQUcvRCx5QkFBb0IsR0FBRyx1Q0FBdUMsQ0FBQztRQUcvRCxzQkFBaUIsR0FBRyx1Q0FBdUMsQ0FBQztRQUc1RCw0QkFBdUIsR0FBRyx5Q0FBeUMsQ0FBQztRQUdwRSwyQkFBc0IsR0FBRyx3Q0FBd0MsQ0FBQztJQVdwRSxDQUFDO0lBTkMsbURBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLHVCQUFxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxnQkFBYSxDQUFBO1NBQ3hGO0lBQ0gsQ0FBQztJQTNCRDtRQURDLEtBQUssRUFBRTsrRUFDd0M7SUFHaEQ7UUFEQyxLQUFLLEVBQUU7NkVBQ2dCO0lBR3hCO1FBREMsS0FBSyxFQUFFO2tGQUN1RDtJQUcvRDtRQURD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cnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnR9IGZyb20gJy4uL21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50JztcbmltcG9ydCB7YW5pbWF0ZSwgYW5pbWF0ZUNoaWxkLCBrZXlmcmFtZXMsIHF1ZXJ5LCBzdGFnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9ufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7c2hha2V9IGZyb20gJy4uLy4uL2FuaW1hdGlvbnMvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mbycsXG4gIGV4cG9ydEFzOiAnbWF0UGFzc3dvcmRTdHJlbmd0aEluZm8nLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLWluZm8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtaW5mby5jb21wb25lbnQuc2NzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgLy8gbmljZSBzdGFnZ2VyIGVmZmVjdCB3aGVuIHNob3dpbmcgZXhpc3RpbmcgZWxlbWVudHNcbiAgICB0cmlnZ2VyKCdsaXN0JywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAvLyBjaGlsZCBhbmltYXRpb24gc2VsZWN0b3IgKyBzdGFnZ2VyXG4gICAgICAgIHF1ZXJ5KCdAaXRlbXMnLFxuICAgICAgICAgIHN0YWdnZXIoMzAwLCBhbmltYXRlQ2hpbGQoKSlcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgXSksXG4gICAgdHJpZ2dlcignaXRlbXMnLCBbXG4gICAgICAvLyBjdWJpYy1iZXppZXIgZm9yIGEgdGlueSBib3VuY2luZyBmZWVsXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwLjUpJywgb3BhY2l0eTogMH0pLFxuICAgICAgICBhbmltYXRlKCcxcyBjdWJpYy1iZXppZXIoLjgsLTAuNiwwLjIsMS41KScsXG4gICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJywgb3BhY2l0eTogMX0pKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKScsIG9wYWNpdHk6IDEsIGhlaWdodDogJyonfSksXG4gICAgICAgIGFuaW1hdGUoJzFzIGN1YmljLWJlemllciguOCwtMC42LDAuMiwxLjUpJyxcbiAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGUoMC41KScsIG9wYWNpdHk6IDAsIGhlaWdodDogJzBweCcsIG1hcmdpbjogJzBweCd9KSlcbiAgICAgIF0pLFxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ3Bvc2l0aXZlU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsnYmFja2ZhY2UtdmlzaWJpbGl0eSc6ICd2aXNpYmxlJ30pLFxuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICd7eyB0aW1pbmcgfX1zIHt7IGRlbGF5IH19cyBlYXNlLWluJyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCA5MGRlZyknLFxuICAgICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOlxuICAgICAgICAgICAgICAgICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2Qoe3sgcm90YXRlWCB9fSwge3sgcm90YXRlWSB9fSwgMCwgLTIwZGVnKScsXG4gICAgICAgICAgICAgIG9mZnNldDogMC40LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKHt7IHJvdGF0ZVggfX0sIHt7IHJvdGF0ZVkgfX0sIDAsIDEwZGVnKScsXG4gICAgICAgICAgICAgIG9mZnNldDogMC42LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgICAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKHt7IHJvdGF0ZVggfX0sIHt7IHJvdGF0ZVkgfX0sIDAsIC01ZGVnKScsXG4gICAgICAgICAgICAgIG9mZnNldDogMC44LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0pXG4gICAgICAgICksXG4gICAgICBdLCB7cGFyYW1zOiB7dGltaW5nOiAxLCBkZWxheTogMCwgcm90YXRlWDogMSwgcm90YXRlWTogMH19KSxcbiAgICBdKSxcbiAgICB0cmlnZ2VyKCduZWdhdGl2ZVN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgdXNlQW5pbWF0aW9uKHNoYWtlKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwYXNzd29yZENvbXBvbmVudDogTWF0UGFzc3dvcmRTdHJlbmd0aENvbXBvbmVudDtcblxuICBASW5wdXQoKVxuICBlbmFibGVTY29yZUluZm8gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBsb3dlckNhc2VDcml0ZXJpYU1zZyA9ICdjb250YWlucyBhdCBsZWFzdCBvbmUgbG93ZXIgY2hhcmFjdGVyJztcblxuICBASW5wdXQoKVxuICB1cHBlckNhc2VDcml0ZXJpYU1zZyA9ICdjb250YWlucyBhdCBsZWFzdCBvbmUgdXBwZXIgY2hhcmFjdGVyJztcblxuICBASW5wdXQoKVxuICBkaWdpdHNDcml0ZXJpYU1zZyA9ICdjb250YWlucyBhdCBsZWFzdCBvbmUgZGlnaXQgY2hhcmFjdGVyJztcblxuICBASW5wdXQoKVxuICBzcGVjaWFsQ2hhcnNDcml0ZXJpYU1zZyA9ICdjb250YWlucyBhdCBsZWFzdCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXInO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbUNoYXJzQ3JpdGVyaWFNc2cgPSAnY29udGFpbnMgYXQgbGVhc3Qgb25lIGN1c3RvbSBjaGFyYWN0ZXInO1xuXG4gIEBJbnB1dCgpXG4gIG1pbkNoYXJzQ3JpdGVyaWFNc2c6IHN0cmluZztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubWluQ2hhcnNDcml0ZXJpYU1zZykge1xuICAgICAgdGhpcy5taW5DaGFyc0NyaXRlcmlhTXNnID0gYGNvbnRhaW5zIGF0IGxlYXN0ICR7dGhpcy5wYXNzd29yZENvbXBvbmVudC5taW59IGNoYXJhY3RlcnNgXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==