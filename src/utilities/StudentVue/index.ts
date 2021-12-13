import Client from './Client';
import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap';
import { DistrictInfo, DistrictObject } from './types';
import url from 'url';

class StudentVue {
  public login(domain: string, username: string, password: string): Promise<Client> {
    return new Promise(async (res) => {
      const host = url.parse(domain).host;
      const endpoint: string = `https://${host}/Service/PXPCommunication.asmx`;
      const client = new Client(username, password, new SoapClient(endpoint));
      try {
        await client.studentInfo();
      } catch (e) {
        throw Error(String(e));
      }
      res(client);
    });
  }

  public async districts(zipCode: string): Promise<DistrictInfo[]> {
    const response = await SoapClient.processAnonymousRequest('HDInfoServices', 'GetMatchingDistrictList', {
      Key: '5E4B7859-B805-474B-A833-FDB15D205D40',
      MatchToDistrictZipCode: zipCode,
    });

    return (await SoapClient.parseString<DistrictObject>(response)).DistrictLists.DistrictInfos[0].DistrictInfo.map(
      (t) => t.$
    );
  }
}

export { default as Client } from './Client';

export default new StudentVue();
