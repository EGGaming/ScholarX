import soap from 'soap';
import xml2json from 'xml2js';
import Client from './Client';

class StudentVue {
  public async login(
    domain: string,
    username: string,
    password: string,
    soapOptions: soap.IOptions = {}
  ): Promise<Client> {
    const host: string = new URL(domain).host;
    const endpoint: string = `https://${host}/Service/PXPCommunication.asmx`;
    const wsdlUrl = endpoint + '?WSDL';
    const client: soap.Client = await soap.createClientAsync(wsdlUrl, { endpoint, escapeXML: false, ...soapOptions });
    return new Client(username, password, client);
  }
}

export default new StudentVue();
