export interface IConfig {
  baseUrl?: string;
  address: string;
  passphrase: string;
}

const config: IConfig = {
  baseUrl: 'http://10.0.0.63:8080/v3',
  address: '',
  passphrase: '',
};

export default config;
