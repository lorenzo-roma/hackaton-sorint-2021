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
    (value: string) => (!!value) && (value.trim() !== "")
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
