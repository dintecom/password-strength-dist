import { __decorate, __read, __spread } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Criteria } from '../../enum/criteria.enum';
import { Colors } from '../../enum/colors.enum';
import { MatPasswordStrengthValidator } from '../../validator/mat-password-strength-validator';
import { RegExpValidator } from '../../validator/regexp.class';
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
export { MatPasswordStrengthComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLFdBQVcsRUFBZSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQVc3RDtJQUFBO1FBS1cscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLDhCQUF5QixHQUFHLElBQUksQ0FBQztRQUNqQyw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBRTdCLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsRUFBRSxDQUFDO1FBR1Qsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFHOUIsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQVMxQyw4QkFBOEI7UUFDOUIsd0JBQW1C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aGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NyaXRlcmlhfSBmcm9tICcuLi8uLi9lbnVtL2NyaXRlcmlhLmVudW0nO1xuaW1wb3J0IHtDb2xvcnN9IGZyb20gJy4uLy4uL2VudW0vY29sb3JzLmVudW0nO1xuaW1wb3J0IHtNYXRQYXNzd29yZFN0cmVuZ3RoVmFsaWRhdG9yfSBmcm9tICcuLi8uLi92YWxpZGF0b3IvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLXZhbGlkYXRvcic7XG5pbXBvcnQge1JlZ0V4cFZhbGlkYXRvcn0gZnJvbSAnLi4vLi4vdmFsaWRhdG9yL3JlZ2V4cC5jbGFzcyc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXBhc3N3b3JkLXN0cmVuZ3RoJyxcbiAgZXhwb3J0QXM6ICdtYXRQYXNzd29yZFN0cmVuZ3RoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1wYXNzd29yZC1zdHJlbmd0aC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1wYXNzd29yZC1zdHJlbmd0aC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIHBhc3N3b3JkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGV4dGVybmFsRXJyb3I6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZW5hYmxlTGVuZ3RoUnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZUxvd2VyQ2FzZUxldHRlclJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlRGlnaXRSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlU3BlY2lhbENoYXJSdWxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSBtaW4gPSA4O1xuICBASW5wdXQoKSBtYXggPSAzMDtcbiAgQElucHV0KCkgY3VzdG9tVmFsaWRhdG9yOiBSZWdFeHA7XG5cbiAgQElucHV0KCkgd2FyblRocmVzaG9sZCA9IDIxO1xuICBASW5wdXQoKSBhY2NlbnRUaHJlc2hvbGQgPSA4MTtcblxuICBAT3V0cHV0KClcbiAgb25TdHJlbmd0aENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNyaXRlcmlhTWFwID0gbmV3IE1hcDxDcml0ZXJpYSwgUmVnRXhwPigpO1xuXG4gIGNvbnRhaW5BdExlYXN0TWluQ2hhcnM6IGJvb2xlYW47XG4gIGNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyOiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcjogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVEaWdpdDogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcjogYm9vbGVhbjtcbiAgY29udGFpbkF0Q3VzdG9tQ2hhcnM6IGJvb2xlYW47XG5cbiAgLy8gVE8gQUNDRVNTIFZJQSBDT05URU5UIENISUxEXG4gIHBhc3N3b3JkRm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIHBhc3N3b3JkQ29uZmlybWF0aW9uRm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgdmFsaWRhdG9yc0FycmF5OiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgcHJpdmF0ZSBfc3RyZW5ndGggPSAwO1xuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIFZhbGlkYXRvcnM6IFZhbGlkYXRvckZuO1xuICBtYXRQYXNzd29yZFN0cmVuZ3RoVmFsaWRhdG9yID0gbmV3IE1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IoKTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFJ1bGVzQW5kVmFsaWRhdG9ycygpO1xuXG4gICAgaWYgKHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoKGNoYW5nZXMuZXh0ZXJuYWxFcnJvciAmJiBjaGFuZ2VzLmV4dGVybmFsRXJyb3IuZmlyc3RDaGFuZ2UpIHx8IGNoYW5nZXMucGFzc3dvcmQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzLmV4dGVybmFsRXJyb3IgJiYgY2hhbmdlcy5leHRlcm5hbEVycm9yLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSBDb2xvcnMud2FybjtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMucGFzc3dvcmQucHJldmlvdXNWYWx1ZSA9PT0gY2hhbmdlcy5wYXNzd29yZC5jdXJyZW50VmFsdWUgJiYgIWNoYW5nZXMucGFzc3dvcmQuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhc3N3b3JkICYmIHRoaXMucGFzc3dvcmQubGVuZ3RoID4gMCA/XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpIDogdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdHJlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdHJlbmd0aCA/IHRoaXMuX3N0cmVuZ3RoIDogMDtcbiAgfVxuXG4gIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUge1xuXG4gICAgaWYgKHRoaXMuX3N0cmVuZ3RoIDwgdGhpcy53YXJuVGhyZXNob2xkKSB7XG4gICAgICByZXR1cm4gQ29sb3JzLndhcm47XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zdHJlbmd0aCA8IHRoaXMuYWNjZW50VGhyZXNob2xkKSB7XG4gICAgICByZXR1cm4gQ29sb3JzLmFjY2VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbG9ycy5wcmltYXJ5O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0TWluQ2hhcnMoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzID0gdGhpcy5wYXNzd29yZC5sZW5ndGggPj0gdGhpcy5taW47XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RNaW5DaGFycztcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9sb3dlcl9jYXNlX2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlciA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX3VwcGVyX2Nhc2VfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZURpZ2l0KCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVEaWdpdCA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2RpZ2l0X2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQ7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhciA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX3NwZWNpYWxfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5DdXN0b21DaGFycygpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdEN1c3RvbUNoYXJzID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9jdXN0b21fY2hhcnMpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdEN1c3RvbUNoYXJzO1xuICB9XG5cbiAgcGFyc2VDdXN0b21WYWxpZGF0b3JzUmVnZXgodmFsdWU6IHN0cmluZyB8IFJlZ0V4cCA9IHRoaXMuY3VzdG9tVmFsaWRhdG9yKSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tVmFsaWRhdG9yIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21WYWxpZGF0b3I7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXN0b21WYWxpZGF0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gUmVnRXhwKHRoaXMuY3VzdG9tVmFsaWRhdG9yKTtcbiAgICB9XG4gIH1cblxuICBzZXRSdWxlc0FuZFZhbGlkYXRvcnMoKTogdm9pZCB7XG4gICAgdGhpcy52YWxpZGF0b3JzQXJyYXkgPSBbXTtcbiAgICB0aGlzLmNyaXRlcmlhTWFwID0gbmV3IE1hcDxDcml0ZXJpYSwgUmVnRXhwPigpO1xuICAgIHRoaXMucGFzc3dvcmRDb25maXJtYXRpb25Gb3JtQ29udHJvbFxuICAgICAgLnNldFZhbGlkYXRvcnMoVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCwgdGhpcy5tYXRQYXNzd29yZFN0cmVuZ3RoVmFsaWRhdG9yLmNvbmZpcm0odGhpcy5wYXNzd29yZClcbiAgICAgIF0pKTtcbiAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgIGlmICh0aGlzLmVuYWJsZUxlbmd0aFJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X2VpZ2h0X2NoYXJzLCBSZWdFeHAoYF4ueyR7dGhpcy5taW59LCR7dGhpcy5tYXh9fSRgKSk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKHRoaXMubWluKSk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKHRoaXMubWF4KSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZUxvd2VyQ2FzZUxldHRlclJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9sb3dlcl9jYXNlX2NoYXIsIFJlZ0V4cFZhbGlkYXRvci5sb3dlckNhc2UpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oUmVnRXhwVmFsaWRhdG9yLmxvd2VyQ2FzZSkpXG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZVVwcGVyQ2FzZUxldHRlclJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV91cHBlcl9jYXNlX2NoYXIsIFJlZ0V4cFZhbGlkYXRvci51cHBlckNhc2UpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oUmVnRXhwVmFsaWRhdG9yLnVwcGVyQ2FzZSkpXG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZURpZ2l0UnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2RpZ2l0X2NoYXIsIFJlZ0V4cFZhbGlkYXRvci5kaWdpdCk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3IuZGlnaXQpKVxuICAgIH1cbiAgICBpZiAodGhpcy5lbmFibGVTcGVjaWFsQ2hhclJ1bGUpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9zcGVjaWFsX2NoYXIsIFJlZ0V4cFZhbGlkYXRvci5zcGVjaWFsQ2hhcik7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3Iuc3BlY2lhbENoYXIpKVxuICAgIH1cbiAgICBpZiAodGhpcy5jdXN0b21WYWxpZGF0b3IpIHtcbiAgICAgIHRoaXMuY3JpdGVyaWFNYXAuc2V0KENyaXRlcmlhLmF0X2N1c3RvbV9jaGFycywgdGhpcy5wYXJzZUN1c3RvbVZhbGlkYXRvcnNSZWdleCgpKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5wYXR0ZXJuKHRoaXMucGFyc2VDdXN0b21WYWxpZGF0b3JzUmVnZXgoKSkpXG4gICAgfVxuXG4gICAgdGhpcy5jcml0ZXJpYU1hcC5mb3JFYWNoKCh2YWx1ZTogYW55LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaCh0aGlzLm1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IudmFsaWRhdGUoa2V5LCB2YWx1ZSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wYXNzd29yZEZvcm1Db250cm9sLnNldFZhbGlkYXRvcnMoVmFsaWRhdG9ycy5jb21wb3NlKFsuLi50aGlzLnZhbGlkYXRvcnNBcnJheV0pKTtcbiAgICB0aGlzLlZhbGlkYXRvcnMgPSBWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnRoaXMudmFsaWRhdG9yc0FycmF5XSk7XG5cbiAgfVxuXG4gIGNhbGN1bGF0ZVBhc3N3b3JkU3RyZW5ndGgoKTogdm9pZCB7XG4gICAgY29uc3QgcmVxdWlyZW1lbnRzOiBBcnJheTxib29sZWFuPiA9IFtdO1xuICAgIGNvbnN0IHVuaXQgPSAxMDAgLyB0aGlzLmNyaXRlcmlhTWFwLnNpemU7XG5cbiAgICAvLyBjb25zb2xlLmxvZygndGhpcy5jcml0ZXJpYU1hcC5zaXplID0gJywgdGhpcy5jcml0ZXJpYU1hcC5zaXplKTtcbiAgICAvLyBjb25zb2xlLmxvZygndW5pdCA9ICcsIHVuaXQpO1xuXG4gICAgcmVxdWlyZW1lbnRzLnB1c2goXG4gICAgICB0aGlzLmVuYWJsZUxlbmd0aFJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE1pbkNoYXJzKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlTG93ZXJDYXNlTGV0dGVyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlVXBwZXJDYXNlTGV0dGVyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlRGlnaXRSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVEaWdpdCgpIDogZmFsc2UsXG4gICAgICB0aGlzLmVuYWJsZVNwZWNpYWxDaGFyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5jdXN0b21WYWxpZGF0b3IgPyB0aGlzLl9jb250YWluQ3VzdG9tQ2hhcnMoKSA6IGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX3N0cmVuZ3RoID0gcmVxdWlyZW1lbnRzLmZpbHRlcih2ID0+IHYpLmxlbmd0aCAqIHVuaXQ7XG4gICAgLy8gY29uc29sZS5sb2coJ2xlbmd0aCA9ICcsIHRoaXMuX3N0cmVuZ3RoIC8gdW5pdCk7XG4gICAgdGhpcy5vblN0cmVuZ3RoQ2hhbmdlZC5lbWl0KHRoaXMuc3RyZW5ndGgpO1xuICAgIHRoaXMuc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9zdHJlbmd0aCA9IDA7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzID1cbiAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIgPVxuICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyID1cbiAgICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQgPVxuICAgICAgICAgICAgdGhpcy5jb250YWluQXRDdXN0b21DaGFycyA9XG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhciA9IGZhbHNlO1xuICB9XG59XG4iXX0=