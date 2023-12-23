export interface yetkiliKullanicilarModel{
    id: number;
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
export interface yetkilendirelecekUserModel{
    tc:string,
    karar:boolean
}