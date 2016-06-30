export class AmortInputs {
    constructor(
        public startYear: Date,
        public startMonth: Date,

        public loanAmount: number,
        public depositAmount: number,

        public interestRate: number,

        public loanDuration: number ) {
    }
}
