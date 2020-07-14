(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/animations'), require('@angular/common'), require('@angular/material/progress-bar'), require('@angular/material/core'), require('@angular/material/card'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@angular-material-extensions/password-strength', ['exports', '@angular/core', '@angular/forms', '@angular/animations', '@angular/common', '@angular/material/progress-bar', '@angular/material/core', '@angular/material/card', '@angular/material/icon'], factory) :
    (global = global || self, factory((global['angular-material-extensions'] = global['angular-material-extensions'] || {}, global['angular-material-extensions']['password-strength'] = {}), global.ng.core, global.ng.forms, global.ng.animations, global.ng.common, global.ng.material['progress-bar'], global.ng.material.core, global.ng.material.card, global.ng.material.icon));
}(this, (function (exports, core, forms, animations, common, progressBar, core$1, card, icon) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    (function (Colors) {
        Colors["primary"] = "primary";
        Colors["accent"] = "accent";
        Colors["warn"] = "warn";
    })(exports.Colors || (exports.Colors = {}));


    (function (Criteria) {
        Criteria["at_least_eight_chars"] = "minChar";
        Criteria["at_least_one_lower_case_char"] = "lowerCase";
        Criteria["at_least_one_upper_case_char"] = "upperCase";
        Criteria["at_least_one_digit_char"] = "digit";
        Criteria["at_least_one_special_char"] = " specialChar";
        Criteria["at_custom_chars"] = "customChars";
    })(exports.Criteria || (exports.Criteria = {}));

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
            core.Input()
        ], MatPassToggleVisibilityComponent.prototype, "isVisible", void 0);
        MatPassToggleVisibilityComponent = __decorate([
            core.Component({
                selector: 'mat-pass-toggle-visibility',
                template: "<button (click)=\"isVisible = !isVisible\"\n        type=\"button\"\n        class=\"mat-icon-button cdk-focused cdk-mouse-focused\" mat-icon-button\n        matRippleCentered=\"true\"\n        matRipple>\n  <mat-icon>{{isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>\n</button>\n\n",
                encapsulation: core.ViewEncapsulation.None,
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
            this.onStrengthChanged = new core.EventEmitter();
            this.criteriaMap = new Map();
            // TO ACCESS VIA CONTENT CHILD
            this.passwordFormControl = new forms.FormControl();
            this.passwordConfirmationFormControl = new forms.FormControl();
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
                this._color = exports.Colors.warn;
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
                    return exports.Colors.warn;
                }
                else if (this._strength < this.accentThreshold) {
                    return exports.Colors.accent;
                }
                else {
                    return exports.Colors.primary;
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
                    .get(exports.Criteria.at_least_one_lower_case_char)
                    .test(this.password);
            return this.containAtLeastOneLowerCaseLetter;
        };
        MatPasswordStrengthComponent.prototype._containAtLeastOneUpperCaseLetter = function () {
            this.containAtLeastOneUpperCaseLetter =
                this.criteriaMap
                    .get(exports.Criteria.at_least_one_upper_case_char)
                    .test(this.password);
            return this.containAtLeastOneUpperCaseLetter;
        };
        MatPasswordStrengthComponent.prototype._containAtLeastOneDigit = function () {
            this.containAtLeastOneDigit =
                this.criteriaMap
                    .get(exports.Criteria.at_least_one_digit_char)
                    .test(this.password);
            return this.containAtLeastOneDigit;
        };
        MatPasswordStrengthComponent.prototype._containAtLeastOneSpecialChar = function () {
            this.containAtLeastOneSpecialChar =
                this.criteriaMap
                    .get(exports.Criteria.at_least_one_special_char)
                    .test(this.password);
            return this.containAtLeastOneSpecialChar;
        };
        MatPasswordStrengthComponent.prototype._containCustomChars = function () {
            this.containAtCustomChars =
                this.criteriaMap
                    .get(exports.Criteria.at_custom_chars)
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
                .setValidators(forms.Validators.compose([
                forms.Validators.required, this.matPasswordStrengthValidator.confirm(this.password)
            ]));
            this.validatorsArray.push(forms.Validators.required);
            if (this.enableLengthRule) {
                this.criteriaMap.set(exports.Criteria.at_least_eight_chars, RegExp("^.{" + this.min + "," + this.max + "}$"));
                this.validatorsArray.push(forms.Validators.minLength(this.min));
                this.validatorsArray.push(forms.Validators.maxLength(this.max));
            }
            if (this.enableLowerCaseLetterRule) {
                this.criteriaMap.set(exports.Criteria.at_least_one_lower_case_char, RegExpValidator.lowerCase);
                this.validatorsArray.push(forms.Validators.pattern(RegExpValidator.lowerCase));
            }
            if (this.enableUpperCaseLetterRule) {
                this.criteriaMap.set(exports.Criteria.at_least_one_upper_case_char, RegExpValidator.upperCase);
                this.validatorsArray.push(forms.Validators.pattern(RegExpValidator.upperCase));
            }
            if (this.enableDigitRule) {
                this.criteriaMap.set(exports.Criteria.at_least_one_digit_char, RegExpValidator.digit);
                this.validatorsArray.push(forms.Validators.pattern(RegExpValidator.digit));
            }
            if (this.enableSpecialCharRule) {
                this.criteriaMap.set(exports.Criteria.at_least_one_special_char, RegExpValidator.specialChar);
                this.validatorsArray.push(forms.Validators.pattern(RegExpValidator.specialChar));
            }
            if (this.customValidator) {
                this.criteriaMap.set(exports.Criteria.at_custom_chars, this.parseCustomValidatorsRegex());
                this.validatorsArray.push(forms.Validators.pattern(this.parseCustomValidatorsRegex()));
            }
            this.criteriaMap.forEach(function (value, key) {
                _this.validatorsArray.push(_this.matPasswordStrengthValidator.validate(key, value));
            });
            this.passwordFormControl.setValidators(forms.Validators.compose(__spread(this.validatorsArray)));
            this.Validators = forms.Validators.compose(__spread(this.validatorsArray));
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
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "password", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "externalError", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "enableLengthRule", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "enableLowerCaseLetterRule", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "enableUpperCaseLetterRule", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "enableDigitRule", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "enableSpecialCharRule", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "min", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "customValidator", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "warnThreshold", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthComponent.prototype, "accentThreshold", void 0);
        __decorate([
            core.Output()
        ], MatPasswordStrengthComponent.prototype, "onStrengthChanged", void 0);
        MatPasswordStrengthComponent = __decorate([
            core.Component({
                selector: 'mat-password-strength',
                exportAs: 'matPasswordStrength',
                template: "<mat-progress-bar mode=\"determinate\"\n                  [color]=\"color\"\n                  [value]=\"strength\">\n</mat-progress-bar>\n",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".green :host::ng-deep .mat-progress-bar.mat-primary .mat-progress-bar-fill::after{background-color:#43a047}"]
            })
        ], MatPasswordStrengthComponent);
        return MatPasswordStrengthComponent;
    }());

    function flipIn(timing, rotateX, rotateY) {
        var params = { timing: timing, delay: 0, rotateX: rotateX, rotateY: rotateY };
        return animations.animation([
            animations.style({ 'backface-visibility': 'visible' }),
            animations.animate('{{ timing }}s {{ delay }}s ease-in', animations.keyframes([
                animations.style({
                    opacity: 0,
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                    offset: 0,
                }),
                animations.style({
                    opacity: 1,
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                    offset: 0.4,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                    offset: 0.6,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                    offset: 0.8,
                }),
                animations.style({
                    transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                    offset: 1,
                }),
            ])),
        ], { params: params });
    }
    var flipInX = flipIn(1, 1, 0);
    var flipInY = flipIn(1, 0, 1);
    var shake = animations.animation(animations.animate('{{ timing }}s {{ delay }}s', animations.keyframes([
        animations.style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
        animations.style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
        animations.style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
        animations.style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
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
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "passwordComponent", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "enableScoreInfo", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "lowerCaseCriteriaMsg", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "upperCaseCriteriaMsg", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "digitsCriteriaMsg", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "specialCharsCriteriaMsg", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "customCharsCriteriaMsg", void 0);
        __decorate([
            core.Input()
        ], MatPasswordStrengthInfoComponent.prototype, "minCharsCriteriaMsg", void 0);
        MatPasswordStrengthInfoComponent = __decorate([
            core.Component({
                selector: 'mat-password-strength-info',
                exportAs: 'matPasswordStrengthInfo',
                template: "<mat-card @list>\n  <mat-card-content>\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLowerCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneLowerCaseLetter; then done else error\" @flipY>\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{lowerCaseCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableUpperCaseLetterRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneUpperCaseLetter; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{upperCaseCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableDigitRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneDigit; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{digitsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableSpecialCharRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastOneSpecialChar; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{specialCharsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.enableLengthRule\">\n      <div *ngIf=\"passwordComponent.containAtLeastMinChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{minCharsCriteriaMsg}}</span>\n    </div>\n\n    <div class=\"info-row\" @items *ngIf=\"passwordComponent.customValidator\">\n      <div *ngIf=\"passwordComponent.containAtCustomChars; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>{{customCharsCriteriaMsg}}</span>\n    </div>\n\n    <div *ngIf=\"enableScoreInfo\" class=\"info-row\" @items>\n      <div *ngIf=\"passwordComponent.strength === 100; then done else error\">\n      </div>\n      <ng-template #done>\n        <mat-icon @positiveState color=\"primary\">done</mat-icon>\n      </ng-template>\n      <ng-template #error>\n        <mat-icon @negativeState color=\"warn\">error</mat-icon>\n      </ng-template>\n      <span>Password's strength = {{passwordComponent.strength}} %100</span>\n    </div>\n\n  </mat-card-content>\n</mat-card>\n",
                animations: [
                    // nice stagger effect when showing existing elements
                    animations.trigger('list', [
                        animations.transition(':enter', [
                            // child animation selector + stagger
                            animations.query('@items', animations.stagger(300, animations.animateChild()))
                        ]),
                    ]),
                    animations.trigger('items', [
                        // cubic-bezier for a tiny bouncing feel
                        animations.transition(':enter', [
                            animations.style({ transform: 'scale(0.5)', opacity: 0 }),
                            animations.animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', animations.style({ transform: 'scale(1)', opacity: 1 }))
                        ]),
                        animations.transition(':leave', [
                            animations.style({ transform: 'scale(1)', opacity: 1, height: '*' }),
                            animations.animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', animations.style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
                        ]),
                    ]),
                    animations.trigger('positiveState', [
                        animations.transition(':enter', [
                            animations.style({ 'backface-visibility': 'visible' }),
                            animations.animate('{{ timing }}s {{ delay }}s ease-in', animations.keyframes([
                                animations.style({
                                    opacity: 0,
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                                    offset: 0,
                                }),
                                animations.style({
                                    opacity: 1,
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                                    offset: 0.4,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                                    offset: 0.6,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                                    offset: 0.8,
                                }),
                                animations.style({
                                    transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                                    offset: 1,
                                }),
                            ])),
                        ], { params: { timing: 1, delay: 0, rotateX: 1, rotateY: 0 } }),
                    ]),
                    animations.trigger('negativeState', [
                        animations.transition(':enter', animations.useAnimation(shake)),
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
            core.NgModule({
                imports: [
                    common.CommonModule,
                    progressBar.MatProgressBarModule,
                    card.MatCardModule,
                    icon.MatIconModule,
                    core$1.MatRippleModule
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

    exports.MatPassToggleVisibilityComponent = MatPassToggleVisibilityComponent;
    exports.MatPasswordStrengthComponent = MatPasswordStrengthComponent;
    exports.MatPasswordStrengthInfoComponent = MatPasswordStrengthInfoComponent;
    exports.MatPasswordStrengthModule = MatPasswordStrengthModule;
    exports.MatPasswordStrengthValidator = MatPasswordStrengthValidator;
    exports.RegExpValidator = RegExpValidator;
    exports.flipIn = flipIn;
    exports.flipInX = flipInX;
    exports.flipInY = flipInY;
    exports.shake = shake;
    exports.ɵa = shake;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-material-extensions-password-strength.umd.js.map