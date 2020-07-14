import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Criteria } from '../../enum/criteria.enum';
import { Colors } from '../../enum/colors.enum';
import { MatPasswordStrengthValidator } from '../../validator/mat-password-strength-validator';
import { RegExpValidator } from '../../validator/regexp.class';
let MatPasswordStrengthComponent = class MatPasswordStrengthComponent {
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
        this._strength = 0;
        this.matPasswordStrengthValidator = new MatPasswordStrengthValidator();
    }
    ngOnInit() {
        this.setRulesAndValidators();
        if (this.password) {
            this.calculatePasswordStrength();
        }
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
export { MatPasswordStrengthComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L21hdC1wYXNzd29yZC1zdHJlbmd0aC9tYXQtcGFzc3dvcmQtc3RyZW5ndGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLFdBQVcsRUFBZSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQVc3RCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQUF6QztRQUtXLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4Qiw4QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDakMsOEJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUdULGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBRzlCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQW9C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QUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsc0JBQXNCO1lBQ3pCLElBQUksQ0FBQyxnQ0FBZ0M7Z0JBQ25DLElBQUksQ0FBQyxnQ0FBZ0M7b0JBQ25DLElBQUksQ0FBQyxzQkFBc0I7d0JBQ3pCLElBQUksQ0FBQyxvQkFBb0I7NEJBQ3ZCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztDQUNGLENBQUE7QUE1TVU7SUFBUixLQUFLLEVBQUU7OERBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFO21FQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTtzRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7K0VBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOytFQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTtxRUFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7MkVBQThCO0FBRTdCO0lBQVIsS0FBSyxFQUFFO3lEQUFTO0FBQ1I7SUFBUixLQUFLLEVBQUU7eURBQVU7QUFDVDtJQUFSLEtBQUssRUFBRTtxRUFBeUI7QUFFeEI7SUFBUixLQUFLLEVBQUU7bUVBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO3FFQUFzQjtBQUc5QjtJQURDLE1BQU0sRUFBRTt1RUFDb0Q7QUFuQmxELDRCQUE0QjtJQVB4QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsdUpBQXFEO1FBRXJELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csNEJBQTRCLENBOE14QztTQTlNWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q3JpdGVyaWF9IGZyb20gJy4uLy4uL2VudW0vY3JpdGVyaWEuZW51bSc7XG5pbXBvcnQge0NvbG9yc30gZnJvbSAnLi4vLi4vZW51bS9jb2xvcnMuZW51bSc7XG5pbXBvcnQge01hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3J9IGZyb20gJy4uLy4uL3ZhbGlkYXRvci9tYXQtcGFzc3dvcmQtc3RyZW5ndGgtdmFsaWRhdG9yJztcbmltcG9ydCB7UmVnRXhwVmFsaWRhdG9yfSBmcm9tICcuLi8uLi92YWxpZGF0b3IvcmVnZXhwLmNsYXNzJztcbmltcG9ydCB7VGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFzc3dvcmQtc3RyZW5ndGgnLFxuICBleHBvcnRBczogJ21hdFBhc3N3b3JkU3RyZW5ndGgnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LXBhc3N3b3JkLXN0cmVuZ3RoLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgcGFzc3dvcmQ6IHN0cmluZztcbiAgQElucHV0KCkgZXh0ZXJuYWxFcnJvcjogYm9vbGVhbjtcblxuICBASW5wdXQoKSBlbmFibGVMZW5ndGhSdWxlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlTG93ZXJDYXNlTGV0dGVyUnVsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZVVwcGVyQ2FzZUxldHRlclJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVEaWdpdFJ1bGUgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGVTcGVjaWFsQ2hhclJ1bGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIG1pbiA9IDg7XG4gIEBJbnB1dCgpIG1heCA9IDMwO1xuICBASW5wdXQoKSBjdXN0b21WYWxpZGF0b3I6IFJlZ0V4cDtcblxuICBASW5wdXQoKSB3YXJuVGhyZXNob2xkID0gMjE7XG4gIEBJbnB1dCgpIGFjY2VudFRocmVzaG9sZCA9IDgxO1xuXG4gIEBPdXRwdXQoKVxuICBvblN0cmVuZ3RoQ2hhbmdlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY3JpdGVyaWFNYXAgPSBuZXcgTWFwPENyaXRlcmlhLCBSZWdFeHA+KCk7XG5cbiAgY29udGFpbkF0TGVhc3RNaW5DaGFyczogYm9vbGVhbjtcbiAgY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXI6IGJvb2xlYW47XG4gIGNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyOiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZURpZ2l0OiBib29sZWFuO1xuICBjb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyOiBib29sZWFuO1xuICBjb250YWluQXRDdXN0b21DaGFyczogYm9vbGVhbjtcblxuICAvLyBUTyBBQ0NFU1MgVklBIENPTlRFTlQgQ0hJTERcbiAgcGFzc3dvcmRGb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgcGFzc3dvcmRDb25maXJtYXRpb25Gb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICB2YWxpZGF0b3JzQXJyYXk6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICBwcml2YXRlIF9zdHJlbmd0aCA9IDA7XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgVmFsaWRhdG9yczogVmFsaWRhdG9yRm47XG4gIG1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IgPSBuZXcgTWF0UGFzc3dvcmRTdHJlbmd0aFZhbGlkYXRvcigpO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0UnVsZXNBbmRWYWxpZGF0b3JzKCk7XG5cbiAgICBpZiAodGhpcy5wYXNzd29yZCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgoY2hhbmdlcy5leHRlcm5hbEVycm9yICYmIGNoYW5nZXMuZXh0ZXJuYWxFcnJvci5maXJzdENoYW5nZSkgfHwgY2hhbmdlcy5wYXNzd29yZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMuZXh0ZXJuYWxFcnJvciAmJiBjaGFuZ2VzLmV4dGVybmFsRXJyb3IuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IENvbG9ycy53YXJuO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlcy5wYXNzd29yZC5wcmV2aW91c1ZhbHVlID09PSBjaGFuZ2VzLnBhc3N3b3JkLmN1cnJlbnRWYWx1ZSAmJiAhY2hhbmdlcy5wYXNzd29yZC5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFzc3dvcmQgJiYgdGhpcy5wYXNzd29yZC5sZW5ndGggPiAwID9cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVQYXNzd29yZFN0cmVuZ3RoKCkgOiB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN0cmVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVuZ3RoID8gdGhpcy5fc3RyZW5ndGggOiAwO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7XG5cbiAgICBpZiAodGhpcy5fc3RyZW5ndGggPCB0aGlzLndhcm5UaHJlc2hvbGQpIHtcbiAgICAgIHJldHVybiBDb2xvcnMud2FybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3N0cmVuZ3RoIDwgdGhpcy5hY2NlbnRUaHJlc2hvbGQpIHtcbiAgICAgIHJldHVybiBDb2xvcnMuYWNjZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29sb3JzLnByaW1hcnk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RNaW5DaGFycygpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnMgPSB0aGlzLnBhc3N3b3JkLmxlbmd0aCA+PSB0aGlzLm1pbjtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE1pbkNoYXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlciA9XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwXG4gICAgICAgIC5nZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2xvd2VyX2Nhc2VfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcigpOiBib29sZWFuIHtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0T25lVXBwZXJDYXNlTGV0dGVyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfdXBwZXJfY2FzZV9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZVVwcGVyQ2FzZUxldHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lRGlnaXQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZURpZ2l0ID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfZGlnaXRfY2hhcilcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0TGVhc3RPbmVEaWdpdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5BdExlYXN0T25lU3BlY2lhbENoYXIoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyID1cbiAgICAgIHRoaXMuY3JpdGVyaWFNYXBcbiAgICAgICAgLmdldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfc3BlY2lhbF9jaGFyKVxuICAgICAgICAudGVzdCh0aGlzLnBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbkN1c3RvbUNoYXJzKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY29udGFpbkF0Q3VzdG9tQ2hhcnMgPVxuICAgICAgdGhpcy5jcml0ZXJpYU1hcFxuICAgICAgICAuZ2V0KENyaXRlcmlhLmF0X2N1c3RvbV9jaGFycylcbiAgICAgICAgLnRlc3QodGhpcy5wYXNzd29yZCk7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbkF0Q3VzdG9tQ2hhcnM7XG4gIH1cblxuICBwYXJzZUN1c3RvbVZhbGlkYXRvcnNSZWdleCh2YWx1ZTogc3RyaW5nIHwgUmVnRXhwID0gdGhpcy5jdXN0b21WYWxpZGF0b3IpIHtcbiAgICBpZiAodGhpcy5jdXN0b21WYWxpZGF0b3IgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbGlkYXRvcjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmN1c3RvbVZhbGlkYXRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBSZWdFeHAodGhpcy5jdXN0b21WYWxpZGF0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHNldFJ1bGVzQW5kVmFsaWRhdG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbGlkYXRvcnNBcnJheSA9IFtdO1xuICAgIHRoaXMuY3JpdGVyaWFNYXAgPSBuZXcgTWFwPENyaXRlcmlhLCBSZWdFeHA+KCk7XG4gICAgdGhpcy5wYXNzd29yZENvbmZpcm1hdGlvbkZvcm1Db250cm9sXG4gICAgICAuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLCB0aGlzLm1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3IuY29uZmlybSh0aGlzLnBhc3N3b3JkKVxuICAgICAgXSkpO1xuICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgaWYgKHRoaXMuZW5hYmxlTGVuZ3RoUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3RfZWlnaHRfY2hhcnMsIFJlZ0V4cChgXi57JHt0aGlzLm1pbn0sJHt0aGlzLm1heH19JGApKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgodGhpcy5taW4pKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgodGhpcy5tYXgpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlTG93ZXJDYXNlTGV0dGVyUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX2xvd2VyX2Nhc2VfY2hhciwgUmVnRXhwVmFsaWRhdG9yLmxvd2VyQ2FzZSk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3IubG93ZXJDYXNlKSlcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlVXBwZXJDYXNlTGV0dGVyUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX3VwcGVyX2Nhc2VfY2hhciwgUmVnRXhwVmFsaWRhdG9yLnVwcGVyQ2FzZSk7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihSZWdFeHBWYWxpZGF0b3IudXBwZXJDYXNlKSlcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlRGlnaXRSdWxlKSB7XG4gICAgICB0aGlzLmNyaXRlcmlhTWFwLnNldChDcml0ZXJpYS5hdF9sZWFzdF9vbmVfZGlnaXRfY2hhciwgUmVnRXhwVmFsaWRhdG9yLmRpZ2l0KTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5wYXR0ZXJuKFJlZ0V4cFZhbGlkYXRvci5kaWdpdCkpXG4gICAgfVxuICAgIGlmICh0aGlzLmVuYWJsZVNwZWNpYWxDaGFyUnVsZSkge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfbGVhc3Rfb25lX3NwZWNpYWxfY2hhciwgUmVnRXhwVmFsaWRhdG9yLnNwZWNpYWxDaGFyKTtcbiAgICAgIHRoaXMudmFsaWRhdG9yc0FycmF5LnB1c2goVmFsaWRhdG9ycy5wYXR0ZXJuKFJlZ0V4cFZhbGlkYXRvci5zcGVjaWFsQ2hhcikpXG4gICAgfVxuICAgIGlmICh0aGlzLmN1c3RvbVZhbGlkYXRvcikge1xuICAgICAgdGhpcy5jcml0ZXJpYU1hcC5zZXQoQ3JpdGVyaWEuYXRfY3VzdG9tX2NoYXJzLCB0aGlzLnBhcnNlQ3VzdG9tVmFsaWRhdG9yc1JlZ2V4KCkpO1xuICAgICAgdGhpcy52YWxpZGF0b3JzQXJyYXkucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4odGhpcy5wYXJzZUN1c3RvbVZhbGlkYXRvcnNSZWdleCgpKSlcbiAgICB9XG5cbiAgICB0aGlzLmNyaXRlcmlhTWFwLmZvckVhY2goKHZhbHVlOiBhbnksIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRvcnNBcnJheS5wdXNoKHRoaXMubWF0UGFzc3dvcmRTdHJlbmd0aFZhbGlkYXRvci52YWxpZGF0ZShrZXksIHZhbHVlKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhc3N3b3JkRm9ybUNvbnRyb2wuc2V0VmFsaWRhdG9ycyhWYWxpZGF0b3JzLmNvbXBvc2UoWy4uLnRoaXMudmFsaWRhdG9yc0FycmF5XSkpO1xuICAgIHRoaXMuVmFsaWRhdG9ycyA9IFZhbGlkYXRvcnMuY29tcG9zZShbLi4udGhpcy52YWxpZGF0b3JzQXJyYXldKTtcblxuICB9XG5cbiAgY2FsY3VsYXRlUGFzc3dvcmRTdHJlbmd0aCgpOiB2b2lkIHtcbiAgICBjb25zdCByZXF1aXJlbWVudHM6IEFycmF5PGJvb2xlYW4+ID0gW107XG4gICAgY29uc3QgdW5pdCA9IDEwMCAvIHRoaXMuY3JpdGVyaWFNYXAuc2l6ZTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmNyaXRlcmlhTWFwLnNpemUgPSAnLCB0aGlzLmNyaXRlcmlhTWFwLnNpemUpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd1bml0ID0gJywgdW5pdCk7XG5cbiAgICByZXF1aXJlbWVudHMucHVzaChcbiAgICAgIHRoaXMuZW5hYmxlTGVuZ3RoUnVsZSA/IHRoaXMuX2NvbnRhaW5BdExlYXN0TWluQ2hhcnMoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVMb3dlckNhc2VMZXR0ZXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVMb3dlckNhc2VMZXR0ZXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVVcHBlckNhc2VMZXR0ZXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIoKSA6IGZhbHNlLFxuICAgICAgdGhpcy5lbmFibGVEaWdpdFJ1bGUgPyB0aGlzLl9jb250YWluQXRMZWFzdE9uZURpZ2l0KCkgOiBmYWxzZSxcbiAgICAgIHRoaXMuZW5hYmxlU3BlY2lhbENoYXJSdWxlID8gdGhpcy5fY29udGFpbkF0TGVhc3RPbmVTcGVjaWFsQ2hhcigpIDogZmFsc2UsXG4gICAgICB0aGlzLmN1c3RvbVZhbGlkYXRvciA/IHRoaXMuX2NvbnRhaW5DdXN0b21DaGFycygpIDogZmFsc2VcbiAgICApO1xuXG4gICAgdGhpcy5fc3RyZW5ndGggPSByZXF1aXJlbWVudHMuZmlsdGVyKHYgPT4gdikubGVuZ3RoICogdW5pdDtcbiAgICAvLyBjb25zb2xlLmxvZygnbGVuZ3RoID0gJywgdGhpcy5fc3RyZW5ndGggLyB1bml0KTtcbiAgICB0aGlzLm9uU3RyZW5ndGhDaGFuZ2VkLmVtaXQodGhpcy5zdHJlbmd0aCk7XG4gICAgdGhpcy5zZXRSdWxlc0FuZFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX3N0cmVuZ3RoID0gMDtcbiAgICB0aGlzLmNvbnRhaW5BdExlYXN0TWluQ2hhcnMgPVxuICAgICAgdGhpcy5jb250YWluQXRMZWFzdE9uZUxvd2VyQ2FzZUxldHRlciA9XG4gICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVVcHBlckNhc2VMZXR0ZXIgPVxuICAgICAgICAgIHRoaXMuY29udGFpbkF0TGVhc3RPbmVEaWdpdCA9XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5BdEN1c3RvbUNoYXJzID1cbiAgICAgICAgICAgICAgdGhpcy5jb250YWluQXRMZWFzdE9uZVNwZWNpYWxDaGFyID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==