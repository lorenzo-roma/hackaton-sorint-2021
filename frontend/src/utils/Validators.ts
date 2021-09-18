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
