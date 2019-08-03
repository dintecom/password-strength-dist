import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { MatProgressBarModule, MatCardModule, MatIconModule, MatRippleModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { animation, style, animate, keyframes, trigger, transition, query, stagger, animateChild, useAnimation } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const Criteria = {
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
const Colors = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatPasswordStrengthValidator {
    /**
     * @param {?} control
     * @return {?}
     */
    isUndefinedOrEmpty(control) {
        if (!control || !control.value || control.value.length === 0) {
            return undefined;
        }
    }
    /**
     * @param {?} criteria
     * @param {?} regex
     * @return {?}
     */
    validate(criteria, regex) {
        /** @type {?} */
        const validator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            this.isUndefinedOrEmpty(control);
            if (!regex.test(control.value)) {
                /** @type {?} */
                const failed = {};
                failed[criteria] = {
                    actualValue: control.value,
                    requiredPattern: regex
                };
                return failed;
            }
            return undefined;
        });
        return validator;
    }
    /**
     * @param {?} password
     * @return {?}
     */
    confirm(password) {
        /** @type {?} */
        const validator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            this.isUndefinedOrEmpty(control);
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RegExpValidator = {
    'lowerCase': RegExp(/^(?=.*?[a-z])/),
    'upperCase': RegExp(/^(?=.*?[A-Z])/),
    'digit': RegExp(/^(?=.*?[0-9])/),
    'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatPasswordStrengthComponent {
    constructor() {
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
    ngOnInit() {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    get strength() {
        return this._strength ? this._strength : 0;
    }
    /**
     * @return {?}
     */
    get color() {
        if (this._strength <= 20) {
            return Colors.warn;
        }
        else if (this._strength <= 80) {
            return Colors.accent;
        }
        else {
            return Colors.primary;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _containAtLeastMinChars() {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    }
    /**
     * @private
     * @return {?}
     */
    _containAtLeastOneLowerCaseLetter() {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    }
    /**
     * @private
     * @return {?}
     */
    _containAtLeastOneUpperCaseLetter() {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    }
    /**
     * @private
     * @return {?}
     */
    _containAtLeastOneDigit() {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    }
    /**
     * @private
     * @return {?}
     */
    _containAtLeastOneSpecialChar() {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    }
    /**
     * @private
     * @return {?}
     */
    _containCustomChars() {
        this.containAtCustomChars =
            this.criteriaMap
                .get(Criteria.at_custom_chars)
                .test(this.password);
        return this.containAtCustomChars;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    parseCustomValidatorsRegex(value = this.customValidator) {
        if (this.customValidator instanceof RegExp) {
            return this.customValidator;
        }
        else if (typeof this.customValidator === 'string') {
            return RegExp(this.customValidator);
        }
    }
    /**
     * @return {?}
     */
    setRulesAndValidators() {
        this.validatorsArray = [];
        this.criteriaMap = new Map();
        this.passwordConfirmationFormControl
            .setValidators(Validators.compose([
            Validators.required, this.matPasswordStrengthValidator.confirm(this.password)
        ]));
        this.validatorsArray.push(Validators.required);
        if (this.enableLengthRule) {
            this.criteriaMap.set(Criteria.at_least_eight_chars, RegExp(`^.{${this.min},${this.max}}$`));
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
        (value, key) => {
            this.validatorsArray.push(this.matPasswordStrengthValidator.validate(key, value));
        }));
        this.passwordFormControl.setValidators(Validators.compose([...this.validatorsArray]));
        this.Validators = Validators.compose([...this.validatorsArray]);
    }
    /**
     * @return {?}
     */
    calculatePasswordStrength() {
        /** @type {?} */
        const requirements = [];
        /** @type {?} */
        const unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false, this.customValidator ? this._containCustomChars() : false);
        this._strength = requirements.filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v)).length * unit;
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
        this.setRulesAndValidators();
    }
    /**
     * @return {?}
     */
    reset() {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtCustomChars =
                            this.containAtLeastOneSpecialChar = false;
    }
}
MatPasswordStrengthComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-password-strength',
                exportAs: 'matPasswordStrength',
                template: `
    <mat-progress-bar mode="determinate"
                      [color]="color"
                      [value]="strength">
    </mat-progress-bar>
  `,
                styles: [`
    .green :host::ng-deep .mat-progress-bar.mat-primary .mat-progress-bar-fill:after{background-color:#43a047}
  `],
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
    const params = { timing: timing, delay: 0, rotateX, rotateY };
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
    ], { params });
}
/** @type {?} */
const flipInX = flipIn(1, 1, 0);
/** @type {?} */
const flipInY = flipIn(1, 0, 1);
/** @type {?} */
const shake = animation(animate('{{ timing }}s {{ delay }}s', keyframes([
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
class MatPasswordStrengthInfoComponent {
    constructor() {
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
    ngOnInit() {
        if (!this.minCharsCriteriaMsg) {
            this.minCharsCriteriaMsg = `contains at least ${this.passwordComponent.min} characters`;
        }
    }
}
MatPasswordStrengthInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-password-strength-info',
                exportAs: 'matPasswordStrengthInfo',
                template: `
    <mat-card @list>
      <mat-card-content>
        <div class="info-row" @items *ngIf="passwordComponent.enableLowerCaseLetterRule">
          <div *ngIf="passwordComponent.containAtLeastOneLowerCaseLetter; then done else error" @flipY>
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{lowerCaseCriteriaMsg}}</span>
        </div>

        <div class="info-row" @items *ngIf="passwordComponent.enableUpperCaseLetterRule">
          <div *ngIf="passwordComponent.containAtLeastOneUpperCaseLetter; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{upperCaseCriteriaMsg}}</span>
        </div>

        <div class="info-row" @items *ngIf="passwordComponent.enableDigitRule">
          <div *ngIf="passwordComponent.containAtLeastOneDigit; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{digitsCriteriaMsg}}</span>
        </div>

        <div class="info-row" @items *ngIf="passwordComponent.enableSpecialCharRule">
          <div *ngIf="passwordComponent.containAtLeastOneSpecialChar; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{specialCharsCriteriaMsg}}</span>
        </div>

        <div class="info-row" @items *ngIf="passwordComponent.enableLengthRule">
          <div *ngIf="passwordComponent.containAtLeastMinChars; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{minCharsCriteriaMsg}}</span>
        </div>

        <div class="info-row" @items *ngIf="passwordComponent.customValidator">
          <div *ngIf="passwordComponent.containAtCustomChars; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>{{customCharsCriteriaMsg}}</span>
        </div>

        <div *ngIf="enableScoreInfo" class="info-row" @items>
          <div *ngIf="passwordComponent.strength === 100; then done else error">
          </div>
          <ng-template #done>
            <mat-icon @positiveState color="primary">done</mat-icon>
          </ng-template>
          <ng-template #error>
            <mat-icon @negativeState color="warn">error</mat-icon>
          </ng-template>
          <span>Password's strength = {{passwordComponent.strength}} %100</span>
        </div>

      </mat-card-content>
    </mat-card>
  `,
                styles: [`
    mat-card{-webkit-box-orient:horizontal;flex-direction:row;place-content:stretch center;-webkit-box-flex:1;flex:1 1 0}mat-card,mat-card mat-card-content{-webkit-box-direction:normal;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:stretch;align-items:stretch}mat-card mat-card-content{-webkit-box-orient:vertical;flex-direction:column;max-width:100%;place-content:stretch flex-start}mat-card mat-card-content mat-icon{margin-right:10px}mat-card mat-card-content .info-row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;box-sizing:border-box;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}
  `],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatPassToggleVisibilityComponent {
    constructor() {
        this._type = 'text';
    }
    /**
     * @return {?}
     */
    get type() {
        return this.isVisible ? 'text' : 'password';
    }
}
MatPassToggleVisibilityComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-pass-toggle-visibility',
                template: `
    <button (click)="isVisible = !isVisible"
            type="button"
            tabindex="-1"
            class="mat-icon-button cdk-focused cdk-mouse-focused" mat-icon-button
            matRippleCentered="true"
            matRipple>
      <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
    </button>
  `,
                styles: [`

  `],
                encapsulation: ViewEncapsulation.None
            },] },
];
MatPassToggleVisibilityComponent.propDecorators = {
    isVisible: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatPasswordStrengthModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MatPasswordStrengthModule,
            providers: []
        };
    }
}
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

export { MatPassToggleVisibilityComponent, MatPasswordStrengthComponent, MatPasswordStrengthInfoComponent, MatPasswordStrengthModule, MatPasswordStrengthValidator, RegExpValidator, shake as ɵa };
//# sourceMappingURL=password-strength.js.map
