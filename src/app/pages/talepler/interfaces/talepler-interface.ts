export interface TalepModel {
    basvuruno: number;
    ad_soyad: string;
    sicil: string;
    telno: string;
    mail: string;
    calisilan_mudurlukno: string;
    basvurulan_mudurlukno: string;
    aciklama: string;
    talep_tarihi: string;
    durum: string;
    sorumlu_tc: string;
  }

  export interface filterDataTalepModel{
    durum?: string,
    basvurulan_mudurlukno?: string,
  }

  export interface updateDataTalepModel{
    basvuruno: number,
    durum: string,
    sorumlu_tc: string,
  }

  export interface updateResTalepModel{
    data: {
      basvuruno: number,
      ad_soyad: string,
      durum: string,
      sorumlu_tc: string,
      sicil: string,
      telno: string,
      mail: string,
      calisilan_mudurlukno: string,
      basvurulan_mudurlukno: string
    },
    message: string,
    status: boolean,
  }

  export interface userDataModel {
    mudurlukno: string;
  }

  export interface UserListModel {
    kullanici: string,
    aduser: string,
    tcno: string,
    ad: string,
    soy: string,
    mudurluk: string,
    xxxxmudurluk_adi: string,
    email: string,
    tel: string,
    cep: string,
    sicilno: string,
    person_ne: string,
    person_neacik: string,
    person_kod: string,
    person_mudurlukk: string,
    person_mudurlukk_acik: string,
    person_mudurluk: string,
    person_mudurluk_acik: string,
    mobilgir: string,
    oimza: string,
    eimza: string,
    mimza: string,
    mimza_operator: string,
    mimza_ceptel: string,
    bloke: string,
    kapat: string,
    kapattrh: string
  }