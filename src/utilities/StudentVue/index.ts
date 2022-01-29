import Client from './Client';
import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap';
import { DistrictInfo, DistrictObject } from './types';
import url from 'url';

class StudentVue {
  public login(domain: string, username: string, password: string): Promise<Client> {
    return new Promise(async (res, rej) => {
      const host = url.parse(domain).host;
      const endpoint: string = `https://${host}/Service/PXPCommunication.asmx`;
      const soap = new SoapClient(endpoint);
      const client = new Client(username, password, soap);
      try {
        await client.calendar(Date.now());
        res(client);
      } catch (e) {
        rej(new Error(e as any));
      }
    });
  }

  public async districts(zipCode: string): Promise<DistrictInfo[]> {
    try {
      const response = await SoapClient.processAnonymousRequest('HDInfoServices', 'GetMatchingDistrictList', {
        Key: '5E4B7859-B805-474B-A833-FDB15D205D40',
        MatchToDistrictZipCode: zipCode,
      });

      return (await SoapClient.parseString<DistrictObject>(response)).DistrictLists.DistrictInfos[0].DistrictInfo.map(
        (t) => t.$
      );
    } catch (e) {
      return [];
    }
  }
}

export { default as Client } from './Client';
export { default as Status } from './Status';

export default new StudentVue();
