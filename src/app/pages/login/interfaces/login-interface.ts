export interface loginDataModel {
    tcno: string;
}

export interface loginCodeModel {
    status: boolean;
    message: string;
    person: any;
    token: string
}

export interface loginDialog {
    status: boolean;
    tel: string;
    smscode: string;
}