import { __decorate, __spread } from 'tslib';
import { Input, Component, ViewEncapsulation, EventEmitter, Output, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { animation, style, animate, keyframes, trigger, transition, query, stagger, animateChild, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

var Colors;
(function (Colors) {
    Colors["primary"] = "primary";
    Colors["accent"] = "accent";
    Colors["warn"] = "warn";
})(Colors || (Colors = {}));

var Criteria;
(function (Criteria) {
    Criteria["at_least_eight_chars"] = "minChar";
    Criteria["at_least_one_lower_case_char"] = "lowerCase";
    Criteria["at_least_one_upper_case_char"] = "upperCase";
    Criteria["at_least_one_digit_char"] = "digit";
    Criteria["at_least_one_special_char"] = " specialChar";
    Criteria["at_custom_chars"] = "customChars";
})(Criteria || (Criteria = {}));

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

var MatPasswordStrengthValidator = /** @class */ (function () {
    function MatPasswordStrengthValidator() {
    }
    MatPasswordStrengthValidator.prototype.isUndefinedOrEmpty = function (control) {
        if (!control || !control.value || control.value.length === 0) {
            return undefined;
        }
    };
    MatPasswordStrengthValidator.prototype.validate = function (criteria, regex) {
        var _this = this;
        var validator = function (control) {
            _this.isUndefinedOrEmpty(control);
            if (!regex.test(control.value)) {
                var failed = {};
                failed[criteria] = {
                    actualValue: control.value,
                    requiredPattern: regex
                };
                return failed;
            }
            return undefined;
        };
        return validator;
    };
    MatPasswordStrengthValidator.prototype.confirm = function (password) {
        var _this = this;
        var validator = function (control) {
            _this.isUndefinedOrEmpty(control);
            if (control.value !== password) {
                return {
                    notConfirmed: {
                        password: password,
                        passwordConfirmation: control.value
                    }
                };
            }
            return undefined;
        };
        return validator;
    };
    return MatPasswordStrengthValidator;
}());

var RegExpValidator = {
    'lowerCase': RegExp(/^(?=.*?[a-z])/),
    'upperCase': RegExp(/^(?=.*?[A-Z])/),
    'digit': RegExp(/^(?=.*?[0-9])/),
    'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
};

var MatPasswordStrengthComponent = /** @class */ (function () {
    function MatPasswordStrengthComponent() {
        this.enableLengthRule = true;
        this.enableLowerCaseLetterRule = true;
        this.enableUpperCaseLetterRule = true;
        this.enableDigitRule = true;
        this.enableSpecialCharRule = true;
        this.min = 8;
        this.max = 30;
        this.warnThreshold = 21;
        this.accentThreshold = 81;
        this.onStrengthChanged = new EventEmitter();
        this.criteriaMap = new Map();
        // TO ACCESS VIA CONTENT CHILD
        this.passwordFormControl = new FormControl();
        this.passwordConfirmationFormControl = new FormControl();
        this.validatorsArray = [];
        this._strength = 0;
        this.matPasswordStrengthValidator = new MatPasswordStrengthValidator();
    }
    MatPasswordStrengthComponent.prototype.ngOnInit = function () {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
    };
    MatPasswordStrengthComponent.prototype.ngOnChanges = function (changes) {
        if ((changes.externalError && changes.externalError.firstChange) || changes.password.isFirstChange()) {
            return;
        }
        else if (changes.externalError && changes.externalError.currentValue) {
            this._color = Colors.warn;
            return;
        }
        else if (changes.password.previousValue === changes.password.currentValue && !changes.password.firstChange) {
            this.calculatePasswordStrength();
        }
        else {
            this.password && this.password.length > 0 ?
                this.calculatePasswordStrength() : this.reset();
        }
    };
    Object.defineProperty(MatPasswordStrengthComponent.prototype, "strength", {
        get: function () {
            return this._strength ? this._strength : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPasswordStrengthComponent.prototype, "color", {
        get: function () {
            if (this._strength < this.warnThreshold) {
                return Colors.warn;
            }
            else if (this._strength < this.accentThreshold) {
                return Colors.accent;
            }
            else {
                return Colors.primary;
            }
        },
        enumerable: true,
        configurable: true
    });
    MatPasswordStrengthComponent.prototype._containAtLeastMinChars = function () {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneLowerCaseLetter = function () {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneUpperCaseLetter = function () {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneDigit = function () {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    };
    MatPasswordStrengthComponent.prototype._containAtLeastOneSpecialChar = function () {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    };
    MatPasswordStrengthComponent.prototype._containCustomChars = function () {
        this.containAtCustomChars =
            this.criteriaMap
                .get(Criteria.at_custom_chars)
                .test(this.password);
        return this.containAtCustomChars;
    };
    MatPasswordStrengthComponent.prototype.parseCustomValidatorsRegex = function (value) {
        if (value === void 0) { value = this.customValidator; }
        if (this.customValidator instanceof RegExp) {
            return this.customValidator;
        }
        else if (typeof this.customValidator === 'string') {
            return RegExp(this.customValidator);
        }
    };
    MatPasswordStrengthComponent.prototype.setRulesAndValidators = function () {
        var _this = this;
        this.validatorsArray = [];
        this.criteriaMap = new Map();
        this.passwordConfirmationFormControl
            .setValidators(Validators.compose([
            Validators.required, this.matPasswordStrengthValidator.confirm(this.password)
        ]));
        this.validatorsArray.push(Validators.required);
        if (this.enableLengthRule) {
            this.criteriaMap.set(Criteria.at_least_eight_chars, RegExp("^.{" + this.min + "," + this.max + "}$"));
            this.validatorsArray.push(Validators.minLength(this.min));
            this.validatorsArray.push(Validators.maxLength(this.max));
        }
        if (this.enableLowerCaseLetterRule) {
            this.criteriaMap.set(Criteria.at_least_one_lower_case_char, RegExpValidator.lowerCase);
            this.validatorsArray.push(Validators.pattern(RegExpValidator.lowerCase));
        }
        if (this.enableUpperCaseLetterRule) {
            this.criteriaMap.set(Criteria.at_least_one_upper_case_char, RegExpValidator.upperCase);
            this.validatorsArray.push(Validators.pattern(RegExpValidator.upperCase));
        }
        if (this.enableDigitRule) {
            this.criteriaMap.set(Criteria.at_least_one_digit_char, RegExpValidator.digit);
            this.validatorsArray.push(Validators.pattern(RegExpValidator.digit));
        }
        if (this.enableSpecialCharRule) {
            this.criteriaMap.set(Criteria.at_least_one_special_char, RegExpValidator.specialChar);
            this.validatorsArray.push(Validators.pattern(RegExpValidator.specialChar));
        }
        if (this.customValidator) {
            this.criteriaMap.set(Criteria.at_custom_chars, this.parseCustomValidatorsRegex());
            this.validatorsArray.push(Validators.pattern(this.parseCustomValidatorsRegex()));
        }
        this.criteriaMap.forEach(function (value, key) {
            _this.validatorsArray.push(_this.matPasswordStrengthValidator.validate(key, value));
        });
        this.passwordFormControl.setValidators(Validators.compose(__spread(this.validatorsArray)));
        this.Validators = Validators.compose(__spread(this.validatorsArray));
    };
    MatPasswordStrengthComponent.prototype.calculatePasswordStrength = function () {
        var requirements = [];
        var unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false, this.customValidator ? this._containCustomChars() : false);
        this._strength = requirements.filter(function (v) { return v; }).length * unit;
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
        this.setRulesAndValidators();
    };
    MatPasswordStrengthComponent.prototype.reset = function () {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtCustomChars =
                            this.containAtLeastOneSpecialChar = false;
    };
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "password", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "externalError", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "enableLengthRule", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "enableLowerCaseLetterRule", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "enableUpperCaseLetterRule", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "enableDigitRule", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "enableSpecialCharRule", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "customValidator", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "warnThreshold", void 0);
    __decorate([
        Input()
    ], MatPasswordStrengthComponent.prototype, "accentThreshold", void 0);
    __decorate([
        Output()
    ], MatPasswordStrengthComponent.prototype, "onStrengthChanged", void 0);
    MatPasswordStrengthComponent = __decorate([
        Component({
            selector: 'mat-password-strength',
            exportAs: 'matPasswordStrength',
            template: "<mat-progress-bar mode=\"determinate\"\n                  [color]=\"color\"\n                  [value]=\"strength\">\n</mat-progress-bar>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".green :host::ng-deep .mat-progress-bar.mat-primary .mat-progress-bar-fill::after{background-color:#43a047}"]
        })
    ], MatPasswordStrengthComponent);
    return MatPasswordStrengthComponent;
}());

function flipIn(timing, rotateX, rotateY) {
    var params = { timing: timing, delay: 0, rotateX: rotateX, rotateY: rotateY };
    return animation([
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
    ], { params: params });
}
var flipInX = flipIn(1, 1, 0);
var flipInY = flipIn(1, 0, 1);
var shake = animation(animate('{{ timing }}s {{ delay }}s', keyframes([
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
    style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
])), { params: { timing: 1, delay: 0 } });

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

/*
 * Public API Surface of password-strength
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Colors, Criteria, MatPassToggleVisibilityComponent, MatPasswordStrengthComponent, MatPasswordStrengthInfoComponent, MatPasswordStrengthModule, MatPasswordStrengthValidator, RegExpValidator, flipIn, flipInX, flipInY, shake, shake as ɵa };
//# sourceMappingURL=angular-material-extensions-password-strength.js.map
