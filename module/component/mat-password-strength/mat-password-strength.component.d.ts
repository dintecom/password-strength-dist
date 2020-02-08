import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Criteria } from '../../enum/criteria.enum';
import { MatPasswordStrengthValidator } from '../../validator/mat-password-strength-validator';
export declare class MatPasswordStrengthComponent implements OnInit, OnChanges {
    password: string;
    externalError: boolean;
    enableLengthRule: boolean;
    enableLowerCaseLetterRule: boolean;
    enableUpperCaseLetterRule: boolean;
    enableDigitRule: boolean;
    enableSpecialCharRule: boolean;
    min: number;
    max: number;
    customValidator: RegExp;
    warnThreshold: number;
    accentThreshold: number;
    onStrengthChanged: EventEmitter<number>;
    criteriaMap: Map<Criteria, RegExp>;
    containAtLeastMinChars: boolean;
    containAtLeastOneLowerCaseLetter: boolean;
    containAtLeastOneUpperCaseLetter: boolean;
    containAtLeastOneDigit: boolean;
    containAtLeastOneSpecialChar: boolean;
    containAtCustomChars: boolean;
    passwordFormControl: FormControl;
    passwordConfirmationFormControl: FormControl;
    validatorsArray: ValidatorFn[];
    private _strength;
    private _color;
    Validators: ValidatorFn;
    matPasswordStrengthValidator: MatPasswordStrengthValidator;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    readonly strength: number;
    readonly color: ThemePalette;
    private _containAtLeastMinChars;
    private _containAtLeastOneLowerCaseLetter;
    private _containAtLeastOneUpperCaseLetter;
    private _containAtLeastOneDigit;
    private _containAtLeastOneSpecialChar;
    private _containCustomChars;
    parseCustomValidatorsRegex(value?: string | RegExp): RegExp;
    setRulesAndValidators(): void;
    calculatePasswordStrength(): void;
    reset(): void;
}
