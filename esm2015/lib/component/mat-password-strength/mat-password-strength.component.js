import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Colors, Criteria } from '../../enum';
import { MatPasswordStrengthValidator } from '../../validator';
import { RegExpValidator } from '../../validator/regexp.class';
export class MatPasswordStrengthComponent {
    constructor() {
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
        this.matPasswordStrengthValidator = new MatPasswordStrengthValidator();
        this._strength = 0;
        this.propagateChange = (_) => {
        };
    }
    get strength() {
        return this._strength ? this._strength : 0;
    }
    get color() {
        if (this._strength < this.warnThreshold) {
            return Colors.warn;
        }
        else if (this._strength < this.accentThreshold) {
            return Colors.accent;
        }
        else {
            return Colors.primary;
        }
    }
    ngOnInit() {
        this.setRulesAndValidators();
    }
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
    parseCustomValidatorsRegex(value = this.customValidator) {
        if (this.customValidator instanceof RegExp) {
            return this.customValidator;
        }
        else if (typeof this.customValidator === 'string') {
            return RegExp(this.customValidator);
        }
    }
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
        this.criteriaMap.forEach((value, key) => {
            this.validatorsArray.push(this.matPasswordStrengthValidator.validate(key, value));
        });
        this.passwordFormControl.setValidators(Validators.compose([...this.validatorsArray]));
        this.Validators = Validators.compose([...this.validatorsArray]);
    }
    calculatePasswordStrength() {
        const requirements = [];
        const unit = 100 / this.criteriaMap.size;
        // console.log('this.criteriaMap.size = ', this.criteriaMap.size);
        // console.log('unit = ', unit);
        requirements.push(this.enableLengthRule ? this._containAtLeastMinChars() : false, this.enableLowerCaseLetterRule ? this._containAtLeastOneLowerCaseLetter() : false, this.enableUpperCaseLetterRule ? this._containAtLeastOneUpperCaseLetter() : false, this.enableDigitRule ? this._containAtLeastOneDigit() : false, this.enableSpecialCharRule ? this._containAtLeastOneSpecialChar() : false, this.customValidator ? this._containCustomChars() : false);
        this._strength = requirements.filter(v => v).length * unit;
        this.propagateChange(this.strength);
        // console.log('length = ', this._strength / unit);
        this.onStrengthChanged.emit(this.strength);
        this.setRulesAndValidators();
    }
    reset() {
        this._strength = 0;
        this.containAtLeastMinChars =
            this.containAtLeastOneLowerCaseLetter =
                this.containAtLeastOneUpperCaseLetter =
                    this.containAtLeastOneDigit =
                        this.containAtCustomChars =
                            this.containAtLeastOneSpecialChar = false;
    }
    writeValue(obj) {
        if (obj) {
            this._strength = obj;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        // throw new Error("Method not implemented.");
    }
    setDisabledState(isDisabled) {
        // throw new Error("Method not implemented.");
    }
    _containAtLeastMinChars() {
        this.containAtLeastMinChars = this.password.length >= this.min;
        return this.containAtLeastMinChars;
    }
    _containAtLeastOneLowerCaseLetter() {
        this.containAtLeastOneLowerCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_lower_case_char)
                .test(this.password);
        return this.containAtLeastOneLowerCaseLetter;
    }
    _containAtLeastOneUpperCaseLetter() {
        this.containAtLeastOneUpperCaseLetter =
            this.criteriaMap
                .get(Criteria.at_least_one_upper_case_char)
                .test(this.password);
        return this.containAtLeastOneUpperCaseLetter;
    }
    _containAtLeastOneDigit() {
        this.containAtLeastOneDigit =
            this.criteriaMap
                .get(Criteria.at_least_one_digit_char)
                .test(this.password);
        return this.containAtLeastOneDigit;
    }
    _containAtLeastOneSpecialChar() {
        this.containAtLeastOneSpecialChar =
            this.criteriaMap
                .get(Criteria.at_least_one_special_char)
                .test(this.password);
        return this.containAtLeastOneSpecialChar;
    }
    _containCustomChars() {
        this.containAtCustomChars =
            this.criteriaMap
                .get(Criteria.at_custom_chars)
                .test(this.password);
        return this.containAtCustomChars;
    }
    ngAfterContentChecked() {
        if (this.password) {
            this.calculatePasswordStrength();
        }
    }
}
MatPasswordStrengthComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-password-strength',
                exportAs: 'matPasswordStrength',
                template: "<mat-progress-bar [color]=\"color\"\n                  [value]=\"strength\"\n                  mode=\"determinate\">\n</mat-progress-bar>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MatPasswordStrengthComponent),
                        multi: true
                    }
                ],
                styles: [".green :host::ng-deep .mat-progress-bar.mat-primary .mat-progress-bar-fill:after{background-color:#43a047}"]
            },] }
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
    warnThreshold: [{ type: Input }],
    accentThreshold: [{ type: Input }],
    onStrengthChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9tYXQtcGFzc3dvcmQtc3RyZW5ndGgvbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQWUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0csT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBa0I3RCxNQUFNLE9BQU8sNEJBQTRCO0lBZHpDO1FBbUJXLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4Qiw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsOEJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUdULGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBRzlCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFTMUMsOEJBQThCO1FBQzlCLHdCQUFtQixHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3JELG9DQUErQixHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWpFLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUVwQyxpQ0FBNEIsR0FBRyxJQUFJLDRCQUE0QixFQUFFLENBQUM7UUFFMUQsY0FBUyxHQUFHLENBQUMsQ0FBQztRQW1CdEIsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQzdCLENBQUMsQ0FBQztJQTRLSixDQUFDO0lBOUxDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFJRCxJQUFJLEtBQUs7UUFFUCxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNoRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdEI7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUN2QjtJQUNILENBQUM7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDcEcsT0FBTztTQUNSO2FBQU0sSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPO1NBQ1I7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDNUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRUQsMEJBQTBCLENBQUMsUUFBeUIsSUFBSSxDQUFDLGVBQWU7UUFDdEUsSUFBSSxJQUFJLENBQUMsZUFBZSxZQUFZLE1BQU0sRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDN0I7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxRQUFRLEVBQUU7WUFDbkQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQy9DLElBQUksQ0FBQywrQkFBK0I7YUFDakMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDaEMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDOUUsQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFDRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBVSxFQUFFLEdBQVcsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUVsRSxDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLE1BQU0sWUFBWSxHQUFtQixFQUFFLENBQUM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRXpDLGtFQUFrRTtRQUNsRSxnQ0FBZ0M7UUFFaEMsWUFBWSxDQUFDLElBQUksQ0FDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQzlELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDakYsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUM3RCxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3pFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQzFELENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxzQkFBc0I7WUFDekIsSUFBSSxDQUFDLGdDQUFnQztnQkFDbkMsSUFBSSxDQUFDLGdDQUFnQztvQkFDbkMsSUFBSSxDQUFDLHNCQUFzQjt3QkFDekIsSUFBSSxDQUFDLG9CQUFvQjs0QkFDdkIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQztJQUN0RCxDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQVE7UUFDakIsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLDhDQUE4QztJQUNoRCxDQUFDO0lBRUQsZ0JBQWdCLENBQUUsVUFBbUI7UUFDbkMsOENBQThDO0lBQ2hELENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDckMsQ0FBQztJQUVPLGlDQUFpQztRQUN2QyxJQUFJLENBQUMsZ0NBQWdDO1lBQ25DLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUM7aUJBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsZ0NBQWdDLENBQUM7SUFDL0MsQ0FBQztJQUVPLGlDQUFpQztRQUN2QyxJQUFJLENBQUMsZ0NBQWdDO1lBQ25DLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUM7aUJBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsZ0NBQWdDLENBQUM7SUFDL0MsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixJQUFJLENBQUMsc0JBQXNCO1lBQ3pCLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUM7aUJBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDckMsQ0FBQztJQUVPLDZCQUE2QjtRQUNuQyxJQUFJLENBQUMsNEJBQTRCO1lBQy9CLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUM7SUFDM0MsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsb0JBQW9CO1lBQ3ZCLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO2lCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7O1lBblBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQix1SkFBcUQ7Z0JBRXJELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzt3QkFDM0QsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7O2FBQ0Y7Ozt1QkFHRSxLQUFLOzRCQUNMLEtBQUs7K0JBRUwsS0FBSzt3Q0FDTCxLQUFLO3dDQUNMLEtBQUs7OEJBQ0wsS0FBSztvQ0FDTCxLQUFLO2tCQUVMLEtBQUs7a0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUVMLEtBQUs7OEJBQ0wsS0FBSztnQ0FFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29sb3JzLCBDcml0ZXJpYX0gZnJvbSAnLi4vLi4vZW51bSc7XG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3J9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcic7XG5pbXBvcnQge1JlZ0V4cFZhbGlkYXRvcn0gZnJvbSAnLi4vLi4vdmFsaWRhdG9yL3JlZ2V4cC5jbGFzcyc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXBhc3N3b3JkLXN0cmVuZ3RoJyxcbiAgZXhwb3J0QXM6ICdtYXRQYXNzd29yZFN0cmVuZ3RoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1wYXNzd29yZC1zdHJlbmd0aC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1wYXNzd29yZC1zdHJlbmd0aC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRQYXNzd29yZFN0cmVuZ3RoQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIHBhc3N3b3JkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGV4dGVybmFsRXJyb3I6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZW5hYmxlTGVuZ3RoUnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZUxvd2VyQ2FzZUxldHRlclJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlRGlnaXRSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlU3BlY2lhbENoYXJSdWxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSBtaW4gPSA4O1xuICBASW5wdXQoKSBtYXggPSAzMDtcbiAgQElucHV0KCkgY3VzdG9tVmFsaWRhdG9yOiBSZWdFeHA7XG5cbiAgQElucHV0KCkgd2FyblRocmVzaG9sZCA9IDIxO1xuICBASW5wdXQoKSBhY2NlbnRUaHJlc2hvbGQgPSA4MTtcblxuICBAT3V0cHV0KClcbiAgb25TdHJlbmd0aENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNyaXRlcmlhTWFwID0gbmV3IE1hcDxDcml0ZXJpYSwgUmVnRXhwPigpO1xuXG4gIGNvbnRhaW5BdExlYXN0TWluQ2hhcnM6IGJvb2xlYW47XG4gIGNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyOiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcjogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVEaWdpdDogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcjogYm9vbGVhbjtcbiAgY29udGFpbkF0Q3VzdG9tQ2hhcnM6IGJvb2xlYW47XG5cbiAgLy8gVE8gQUNDRVNTIFZJQSBDT05URU5UIENISUxEXG4gIHBhc3N3b3JkRm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIHBhc3N3b3JkQ29uZmlybWF0aW9uRm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgdmFsaWRhdG9yc0FycmF5OiBWYWxpZGF0b3JGbltdID0gW107XG4gIFZhbGlkYXRvcnM6IFZhbGlkYXRvckZuO1xuICBtYXRQYXNzd29yZFN0cmVuZ3RoVmFsaWRhdG9yID0gbmV3IE1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IoKTtcblxuICBwcml2YXRlIF9zdHJlbmd0aCA9IDA7XG5cbiAgZ2V0IHN0cmVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVuZ3RoID8gdGhpcy5fc3RyZW5ndGggOiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHtcblxuICAgIGlmICh0aGlzLl9zdHJlbmd0aCA8IHRoaXMud2FyblRocmVzaG9sZCkge1xuICAgICAgcmV0dXJuIENvbG9ycy53YXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc3RyZW5ndGggPCB0aGlzLmFjY2VudFRocmVzaG9sZCkge1xuICAgICAgcmV0dXJuIENvbG9ycy5hY2NlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb2xvcnMucHJpbWFyeTtcbiAgICB9XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRSdWxlc0FuZFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoKGNoYW5nZXMuZXh0ZXJuYWxFcnJvciAmJiBjaGFuZ2VzLmV4dGVybmFsRXJyb3IuZmlyc3RDaGFuZ2UpIHx8IGNoYW5nZXMucGFzc3dvcmQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzLmV4dGVybmFsRXJyb3IgJiYgY2hhbmdlcy5leHRlcm5hbEVycm9yLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSBDb2xvcnMud2FybjtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMucGFzc3dvcmQucHJldmlvdXNWYWx1ZSA9PT0gY2hhbmdlcy5wYXNzd29yZC5jdXJyZW50VmFsdWUgJiYgIWNoYW5nZXMucGFzc3dvcmQuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhc3N3b3JkICYmIHRoaXMucGFzc3dvcmQubGVuZ3RoID4gMCA/XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpIDogdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlQ3VzdG9tVmFsaWRhdG9yc1JlZ2V4KHZhbHVlOiBzdHJpbmcgfCBSZWdFeHAgPSB0aGlzLmN1c3RvbVZhbGlkYXRvcikge1xuICAgIGlmICh0aGlzLmN1c3RvbVZhbGlkYXRvciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tVmFsaWRhdG9yO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY3VzdG9tVmFsaWRhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIFJlZ0V4cCh0aGlzLmN1c3RvbVZhbGlkYXRvcik7XG4gICAgfVxuICB9XG5cbiAgc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk6IHZvaWQge1xuICAgIHRoaXMudmFsaWRhdG9yc0FycmF5ID0gW107XG4gICAgdGhpcy5jcml0ZXJpYU1hcCA9IG5ldyBNYXA8Q3JpdGVyaWEsIFJlZ0V4cD4oKTtcbiAgICB0aGlzLnBhc3N3b3JkQ29uZmlybWF0aW9uRm9ybUNvbnRyb2xcbiAgICAgIC5zZXRWYWxpZGF0b3JzKFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsIHRoaXMubWF0UGFzc3dvcmRTdHJlbmd0aFZhbGlkYXRvci5jb25maXJtKHRoaXMucGFzc3dvcmQpXG4gICAgICBdKSk7XG4gICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICBpZiAodGhpcy5lbmFibGVMZW5ndGhSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9laWdodF9jaGFycywgUmVnRXhwKGBeLnske3RoaXMubWlufSwke3RoaXMubWF4fX0kYCkpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aCh0aGlzLm1pbikpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCh0aGlzLm1heCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmFibGVMb3dlckNhc2VMZXR0ZXJSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfbG93ZXJfY2FzZV9jaGFyLCBSZWdFeHBWYWxpZGF0b3IubG93ZXJDYXNlKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5wYXR0ZXJuKFJlZ0V4cFZhbGlkYXRvci5sb3dlckNhc2UpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlVXBwZXJDYXNlTGV0dGVyUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX3VwcGVyX2Nhc2VfY2hhciwgUmVnRXhwVmFsaWRhdG9yLnVwcGVyQ2FzZSk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3IudXBwZXJDYXNlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZURpZ2l0UnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2RpZ2l0X2NoYXIsIFJlZ0V4cFZhbGlkYXRvci5kaWdpdCk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3IuZGlnaXQpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlU3BlY2lhbENoYXJSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfc3BlY2lhbF9jaGFyLCBSZWdFeHBWYWxpZGF0b3Iuc3BlY2lhbENoYXIpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oUmVnRXhwVmFsaWRhdG9yLnNwZWNpYWxDaGFyKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfY3VzdG9tX2NoYXJzLCB0aGlzLnBhcnNlQ3VzdG9tVmFsaWRhdG9yc1JlZ2V4KCkpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4odGhpcy5wYXJzZUN1c3RvbVZhbGlkYXRvcnNSZWdleCgpKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jcml0ZXJpYU1hcC5mb3JFYWNoKCh2YWx1ZTogYW55LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaCh0aGlzLm1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IudmFsaWRhdGUoa2V5LCB2YWx1ZSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wYXNzd29yZEZvcm1Db250cm9sLnNldFZhbGlkYXRvcnMoVmFsaWRhdG9ycy5jb21wb3NlKFsuLi50aGlzLnZhbGlkYXRvcnNBcnJheV0pKTtcbiAgICB0aGlzLlZhbGlkYXRvcnMgPSBWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnRoaXMudmFsaWRhdG9yc0FycmF5XSk7XG5cbiAgfVxuXG4gIGNhbGN1bGF0ZVBhc3N3b3JkU3RyZW5ndGgoKTogdm9pZCB7XG4gICAgY29uc3QgcmVxdWlyZW1lbnRzOiBBcnJheTxib29sZWFuPiA9IFtdO1xuICAgIGNvbnN0IHVuaXQgPSAxMDAgLyB0aGlzLmNyaXRlcmlhTWFwLnNpemU7XG5cbiAgICAvLyBjb25zb2xlLmxvZygndGhpcy5jcml0ZXJpYU1hcC5zaXplID0gJywgdGhpcy5jcml0ZXJpYU1hcC5zaXplKTtcbiAgICAvLyBjb25zb2xlLmxvZygndW5pdCA9ICcsIHVuaXQpO1xuXG4gICAgcmVxdWlyZW1lbnRzLnB1c2goXG4gICAgICB0aGlzLmVuYWJsZUxlbmd0aFJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE1pbkNoYXJzKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlTG93ZXJDYXNlTGV0dGVyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlVXBwZXJDYXNlTGV0dGVyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyKCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlRGlnaXRSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVEaWdpdCgpIDogZmFsc2UsXG4gICAgICB0aGlzLmVuYWJsZVNwZWNpYWxDaGFyUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5jdXN0b21WYWxpZGF0b3IgPyB0aGlzLl9jb250YWluQ3VzdG9tQ2hhcnMoKSA6IGZhbHNlXG4gICAgKTtcblxuICAgIHRoaXMuX3N0cmVuZ3RoID0gcmVxdWlyZW1lbnRzLmZpbHRlcih2ID0+IHYpLmxlbmd0aCAqIHVuaXQ7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5zdHJlbmd0aCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2xlbmd0aCA9ICcsIHRoaXMuX3N0cmVuZ3RoIC8gdW5pdCk7XG4gICAgdGhpcy5vblN0cmVuZ3RoQ2hhbmdlZC5lbWl0KHRoaXMuc3RyZW5ndGgpO1xuICAgIHRoaXMuc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9zdHJlbmd0aCA9IDA7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzID1cbiAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIgPVxuICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyID1cbiAgICAgICAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQgPVxuICAgICAgICAgICAgdGhpcy5jb250YWluQXRDdXN0b21DaGFycyA9XG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhciA9IGZhbHNlO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHRoaXMuX3N0cmVuZ3RoID0gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE1pbkNoYXJzKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RNaW5DaGFycyA9IHRoaXMucGFzc3dvcmQubGVuZ3RoID49IHRoaXMubWluO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnM7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lTG93ZXJDYXNlTGV0dGVyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfbG93ZXJfY2FzZV9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV91cHBlcl9jYXNlX2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVEaWdpdCgpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lRGlnaXQgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9kaWdpdF9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZURpZ2l0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2xlYXN0X29uZV9zcGVjaWFsX2NoYXIpXG4gICAgICAgIC50ZXN0KHRoaXMucGFzc3dvcmQpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQ3VzdG9tQ2hhcnMoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRDdXN0b21DaGFycyA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfY3VzdG9tX2NoYXJzKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRDdXN0b21DaGFycztcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYXNzd29yZCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=