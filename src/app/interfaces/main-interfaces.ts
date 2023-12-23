export interface saysisUserModel{
    ad: string;
    aduser: string;
    bloke: string;
    cep: string;
    eimza: string;
    email: string;
    kapat: string;
    kapattrh: string;
    kullanici: string;
    mimza: string;
    mimza_ceptel: string;
    mimza_operator: string;
    mobilgir: string;
    mudurluk: string;
    oimza: string;
    person_kod: string;
    person_mudurluk: string;
    person_mudurluk_acik: string;
    person_mudurlukk: string;
    person_mudurlukk_acik: string;
    person_ne: string;
    person_neacik: string;
    sicilno: string;
    soy: string;
    tcno: string;
    tel: string;
    xxxxmudurluk_adi: string;
}

export  interface usersRoleModel{
    ad: string;
    cep: string;
    email: string;
    kullaniciadi: string;
    mudurluk_adi: string;
    mudurluk_no: string;
    personkod: string;
    soyadi: string;
    sicil: string;
    tc: string;
    persontype: string;
    yetki:string;
}
export interface addedUsersMole {
    id:number,
    ad: string;
    cep: string;
    email: string;
    kullaniciadi: string;
    mudurluk_adi: string;
    mudurluk_no: string;
    personkod: string;
    soyadi: string;
    sicil: string;
    tc: string;
    persontype: string;
}
export interface generalResModel{
    status:boolean,
    data:any
    message:string
}
export type userYetkiModel= 'admin' | 'viewer' | 'creator';
export interface localUserModel extends saysisUserModel {
    yetki:string
}
