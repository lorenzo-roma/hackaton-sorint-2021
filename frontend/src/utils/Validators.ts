export class Validator<T> {
    withPrintable(printable: string) {
        return new Validator({type: this.error.type, printable}, this.handler);
    }

    constructor(public error: ValidatorError, public handler: (value: T) => boolean) {
    }
}

export interface ValidatorError {
    type: string,
    printable: string
}

export const NOT_EMPTY_STRING = new Validator(
    {
        type: 'NOT_EMPTY',
        printable: 'The input is empty'
    },
    (value: string) => (!!value) && ((value?.trim() || "") !== "")
);
export const NOT_EMPTY = new Validator(
    {
        type: 'NOT_EMPTY',
        printable: 'The input is empty'
    },
    (value: any) => (!!value)
);

export const MIN_LENGTH = (minLength: number) => new Validator(
    {
        type: 'NOT_EMPTY',
        printable: 'The input is empty'
    },
    (value: string | any[]) => value.length >= minLength
);

export const GREATER_THAN = (than: any) => new Validator(
    {
        type: 'GREATER_THAN',
        printable: 'The input is empty'
    },
    (value: any) => value > than
);
export const LOWER_THAN = (than: any) => new Validator(
    {
        type: 'LOWER_THAN',
        printable: 'The input is empty'
    },
    (value: any) => value < than
);

export const NUMBER = new Validator(
    {
        type: 'NUMBER',
        printable: 'The input must be a number'
    },
    (value: any) => {
            return !isNaN(parseInt(value));
    }
);

export const PHONE_NUMBER = new Validator<string>(
    {
        type: 'PHONE_NUMBER',
        printable: 'The input must be a phone number with prefix'
    },
    (value: string) => {
            return /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]| 4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/.test(value)
    }
);
