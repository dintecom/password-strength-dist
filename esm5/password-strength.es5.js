import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation, NgModule } from '@angular/core';
import { MatProgressBarModule, MatCardModule, MatIconModule, MatRippleModule } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { animation, style, animate, keyframes, trigger, transition, query, stagger, animateChild, useAnimation } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var Criteria = {
    at_least_eight_chars: 'minChar',
    at_least_one_lower_case_char: 'lowerCase',
    at_least_one_upper_case_char: 'upperCase',
    at_least_one_digit_char: 'digit',
    at_least_one_special_char: ' specialChar',
    at_custom_chars: 'customChars',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var Colors = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatPasswordStrengthValidator = /** @class */ (function () {
    function MatPasswordStrengthValidator() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    MatPasswordStrengthValidator.prototype.isUndefinedOrEmpty = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        if (!control || !control.value || control.value.length === 0) {
            return undefined;
        }
    };
    /**
     * @param {?} criteria
     * @param {?} regex
     * @return {?}
     */
    MatPasswordStrengthValidator.prototype.validate = /**
     * @param {?} criteria
     * @param {?} regex
     * @return {?}
     */
    function (criteria, regex) {
        var _this = this;
        /** @type {?} */
        var validator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.isUndefinedOrEmpty(control);
            if (!regex.test(control.value)) {
                /** @type {?} */
                var failed = {};
                failed[criteria] = {
                    actualValue: control.value,
                    requiredPattern: regex
                };
                return failed;
            }
            return undefined;
        });
        return validator;
    };
    /**
     * @param {?} password
     * @return {?}
     */
    MatPasswordStrengthValidator.prototype.confirm = /**
     * @param {?} password
     * @return {?}
     */
    function (password) {
        var _this = this;
        /** @type {?} */
        var validator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
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
        });
        return validator;
    };
    return MatPasswordStrengthValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var RegExpValidator = {
    'lowerCase': RegExp(/^(?=.*?[a-z])/),
    'upperCase': RegExp(/^(?=.*?[A-Z])/),
    'digit': RegExp(/^(?=.*?[0-9])/),
    'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatPasswordStrengthComponent = /** @class */ (function () {
    function MatPasswordStrengthComponent() {
        this.enableLengthRule = true;
        this.enableLowerCaseLetterRule = true;
        this.enableUpperCaseLetterRule = true;
        this.enableDigitRule = true;
        this.enableSpecialCharRule = true;
        this.min = 8;
        this.max = 30;
        this.onStrengthChanged = new EventEmitter();
        this.criteriaMap = new Map();
        // TO ACCESS VIA CONTENT CHILD
        this.passwordFormControl = new FormControl();
        this.passwordConfirmationFormControl = new FormControl();
        this.validatorsArray = [];
        this._strength = 0;
        this.matPasswordStrengthValidator = new MatPasswordStrengthValidator();
    }
    /**
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
        get: /**
         * @return {?}
         */
        function () {
            return this._strength ? this._strength : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatPasswordStrengthComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._strength <= 20) {
                return Colors.warn;
            }
            else if (this._strength <= 80) {
                return Colors.accent;
            }
            else {
                return Colors.primary;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containAtLeastMinChars = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    };
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containAtLeastOneLowerCaseLetter = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    };
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containAtLeastOneUpperCaseLetter = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    };
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containAtLeastOneDigit = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    };
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containAtLeastOneSpecialChar = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    };
    /**
     * @private
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype._containCustomChars = /**
     * @private
     * @return {?}
     */
    function () {
        this.containAtCustomChars =
            this.criteriaMap
                .get(Criteria.at_custom_chars)
                .test(this.password);
        return this.containAtCustomChars;
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.parseCustomValidatorsRegex = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = this.customValidator; }
        if (this.customValidator instanceof RegExp) {
            return this.customValidator;
        }
        else if (typeof this.customValidator === 'string') {
            return RegExp(this.customValidator);
        }
    };
    /**
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.setRulesAndValidators = /**
     * @return {?}
     */
    function () {
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
        this.criteriaMap.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) {
            _this.validatorsArray.push(_this.matPasswordStrengthValidator.validate(key, value));
        }));
        this.passwordFormControl.setValidators(Validators.compose(this.validatorsArray.slice()));
        this.Validators = Validators.compose(this.validatorsArray.slice());
    };
    /**
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.calculatePasswordStrength = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var requirements = [];
        /** @type {?} */
        var unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false, this.customValidator ? this._containCustomChars() : false);
        this._strength = requirements.filter((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v; })).length * unit;
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
        this.setRulesAndValidators();
    };
    /**
     * @return {?}
     */
    MatPasswordStrengthComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtCustomChars =
                            this.containAtLeastOneSpecialChar = false;
    };
    MatPasswordStrengthComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-password-strength',
                    exportAs: 'matPasswordStrength',
                    template: "\n    <mat-progress-bar mode=\"determinate\"\n                      [color]=\"color\"\n                      [value]=\"strength\">\n    </mat-progress-bar>\n  ",
                    styles: ["\n    .green :host::ng-deep .mat-progress-bar.mat-primary .mat-progress-bar-fill:after{background-color:#43a047}\n  "],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    MatPasswordStrengthComponent.propDecorators = {
        password: [{ type: Input }],
        externalError: [{ type: Input }],
        enableLengthRule: [{ type: Input }],
        enableLowerCaseLetterRule: [{ type: Input }],
        enableUpperCaseLetterRule: [{ type: Input }],
        enableDigitRule: [{ type: Input }],
        enableSpecialCharRule: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        customValidator: [{ type: Input }],
        onStrengthChanged: [{ type: Output }]
    };
    return MatPasswordStrengthComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} timing
 * @param {?} rotateX
 * @param {?} rotateY
 * @return {?}
 */
function flipIn(timing, rotateX, rotateY) {
    /** @type {?} */
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
/** @type {?} */
var flipInX = flipIn(1, 1, 0);
/** @type {?} */
var flipInY = flipIn(1, 0, 1);
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatPasswordStrengthInfoComponent = /** @class */ (function () {
    function MatPasswordStrengthInfoComponent() {
        this.enableScoreInfo = false;
        this.lowerCaseCriteriaMsg = 'contains at least one lower character';
        this.upperCaseCriteriaMsg = 'contains at least one upper character';
        this.digitsCriteriaMsg = 'contains at least one digit character';
        this.specialCharsCriteriaMsg = 'contains at least one special character';
        this.customCharsCriteriaMsg = 'contains at least one custom character';
    }
    /**
     * @return {?}
     */
    MatPasswordStrengthInfoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.minCharsCriteriaMsg) {
            this.minCharsCriteriaMsg = "contains at least " + this.passwordComponent.min + " characters";
        }
    };
    MatPasswordStrengthInfoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-password-strength-info',
                    exportAs: 'matPasswordStrengthInfo',
                    template: "\n    <mat-card @list>\n      <mat-card-content>\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLowerCaseLetterRule\">\n          <div *ngIf=\"passwordComponent.containAtLeastOneLowerCaseLetter; then done else error\" @flipY>\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{lowerCaseCriteriaMsg}}</span>\n        </div>\n\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableUpperCaseLetterRule\">\n          <div *ngIf=\"passwordComponent.containAtLeastOneUpperCaseLetter; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{upperCaseCriteriaMsg}}</span>\n        </div>\n\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableDigitRule\">\n          <div *ngIf=\"passwordComponent.containAtLeastOneDigit; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{digitsCriteriaMsg}}</span>\n        </div>\n\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableSpecialCharRule\">\n          <div *ngIf=\"passwordComponent.containAtLeastOneSpecialChar; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{specialCharsCriteriaMsg}}</span>\n        </div>\n\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLengthRule\">\n          <div *ngIf=\"passwordComponent.containAtLeastMinChars; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{minCharsCriteriaMsg}}</span>\n        </div>\n\n        <div class=\"info-row\" @items *ngIf=\"passwordComponent.customValidator\">\n          <div *ngIf=\"passwordComponent.containAtCustomChars; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>{{customCharsCriteriaMsg}}</span>\n        </div>\n\n        <div *ngIf=\"enableScoreInfo\" class=\"info-row\" @items>\n          <div *ngIf=\"passwordComponent.strength === 100; then done else error\">\n          </div>\n          <ng-template #done>\n            <mat-icon @positiveState color=\"primary\">done</mat-icon>\n          </ng-template>\n          <ng-template #error>\n            <mat-icon @negativeState color=\"warn\">error</mat-icon>\n          </ng-template>\n          <span>Password's strength = {{passwordComponent.strength}} %100</span>\n        </div>\n\n      </mat-card-content>\n    </mat-card>\n  ",
                    styles: ["\n    mat-card{-webkit-box-orient:horizontal;flex-direction:row;place-content:stretch center;-webkit-box-flex:1;flex:1 1 0}mat-card,mat-card mat-card-content{-webkit-box-direction:normal;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:stretch;align-items:stretch}mat-card mat-card-content{-webkit-box-orient:vertical;flex-direction:column;max-width:100%;place-content:stretch flex-start}mat-card mat-card-content mat-icon{margin-right:10px}mat-card mat-card-content .info-row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}\n  "],
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
                },] },
    ];
    MatPasswordStrengthInfoComponent.propDecorators = {
        passwordComponent: [{ type: Input }],
        enableScoreInfo: [{ type: Input }],
        lowerCaseCriteriaMsg: [{ type: Input }],
        upperCaseCriteriaMsg: [{ type: Input }],
        digitsCriteriaMsg: [{ type: Input }],
        specialCharsCriteriaMsg: [{ type: Input }],
        customCharsCriteriaMsg: [{ type: Input }],
        minCharsCriteriaMsg: [{ type: Input }]
    };
    return MatPasswordStrengthInfoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatPassToggleVisibilityComponent = /** @class */ (function () {
    function MatPassToggleVisibilityComponent() {
        this._type = 'text';
    }
    Object.defineProperty(MatPassToggleVisibilityComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isVisible ? 'text' : 'password';
        },
        enumerable: true,
        configurable: true
    });
    MatPassToggleVisibilityComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-pass-toggle-visibility',
                    template: "\n    <button (click)=\"isVisible = !isVisible\"\n            type=\"button\"\n            tabindex=\"-1\"\n            class=\"mat-icon-button cdk-focused cdk-mouse-focused\" mat-icon-button\n            matRippleCentered=\"true\"\n            matRipple>\n      <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>\n    </button>\n  ",
                    styles: ["\n\n  "],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    MatPassToggleVisibilityComponent.propDecorators = {
        isVisible: [{ type: Input }]
    };
    return MatPassToggleVisibilityComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatPasswordStrengthModule = /** @class */ (function () {
    function MatPasswordStrengthModule() {
    }
    /**
     * @return {?}
     */
    MatPasswordStrengthModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: MatPasswordStrengthModule,
            providers: []
        };
    };
    MatPasswordStrengthModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    return MatPasswordStrengthModule;
}());

export { MatPassToggleVisibilityComponent, MatPasswordStrengthComponent, MatPasswordStrengthInfoComponent, MatPasswordStrengthModule, MatPasswordStrengthValidator, RegExpValidator, shake as ɵa };
//# sourceMappingURL=password-strength.es5.js.map
