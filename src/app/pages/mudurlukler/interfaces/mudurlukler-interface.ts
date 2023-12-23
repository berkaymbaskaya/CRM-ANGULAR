export interface MudurlukModel {
  kodu: number;
  adi: string;
}
export interface addResult {
  status: boolean;
  message: string;
  data: MudurlukModel & { id: number }
}
