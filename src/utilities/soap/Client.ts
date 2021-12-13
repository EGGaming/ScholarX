import axios from 'axios';
import xml2js from 'react-native-xml2js';
import { SoapError } from './types';

const builder = new xml2js.Builder();
const parser = new xml2js.Parser();

interface IProcessWebServiceRequest {
  userID: string;
  password: string;
  skipLoginLog: number;
  parent: number;
  webServiceHandleName: string;
  methodName: string;
  paramStr: string;
}

function parseParam(obj: Object): string {
  let paramStr = '<Parms>';
  Object.entries(obj).forEach(([key, value]) => {
    paramStr += '<' + key + '>';
    paramStr += value;
    paramStr += '</' + key + '>';
  });
  paramStr += '</Parms>';

  return paramStr;
}

export default class Client {
  private postUrl: string;
  constructor(postUrl: string) {
    this.postUrl = postUrl;
  }

  public static async processAnonymousRequest(serviceName: string, methodName: string, params: Object) {
    const paramStr = parseParam(params);

    const xml = builder.buildObject({
      'soap:Envelope': {
        $: {
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
          'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
        },
        'soap:Body': {
          ProcessWebServiceRequest: {
            $: {
              xmlns: 'http://edupoint.com/webservices/',
            },
            ...({
              userID: 'EdupointDistrictInfo',
              password: 'Edup01nt',
              skipLoginLog: 1,
              parent: 0,
              webServiceHandleName: serviceName,
              methodName,
              paramStr,
            } as IProcessWebServiceRequest),
          },
        },
      },
    });
    return axios
      .post('https://support.edupoint.com/Service/HDInfoCommunication.asmx', xml, {
        headers: { 'Content-Type': 'text/xml' },
      })
      .then((res) => res.data);
  }

  public async processRequest(
    username: string,
    password: string,
    serviceName: string,
    methodName: string,
    params: Object
  ): Promise<string> {
    return new Promise(async (res) => {
      try {
        const paramStr = parseParam(params);

        const xml = builder.buildObject({
          'soap:Envelope': {
            $: {
              'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
              'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
            },
            'soap:Body': {
              ProcessWebServiceRequest: {
                $: {
                  xmlns: 'http://edupoint.com/webservices/',
                },
                ...({
                  userID: username,
                  password: password,
                  skipLoginLog: 1,
                  parent: 0,
                  webServiceHandleName: serviceName,
                  methodName,
                  paramStr,
                } as IProcessWebServiceRequest),
              },
            },
          },
        });
        const data = await axios
          .post(this.postUrl, xml, { headers: { 'Content-Type': 'text/xml' } })
          .then((res) => res.data);
        res(data);
      } catch (e) {
        console.error(e);
      }
    });
  }

  public static parseString<Result>(xml: string): Promise<Result> {
    return new Promise((res, rej) => {
      parser.parseString(xml, (err: any, data: any) => {
        if (err) throw Error(err);

        const l =
          data['soap:Envelope']['soap:Body'][0].ProcessWebServiceRequestResponse[0].ProcessWebServiceRequestResult[0];

        parser.parseString(l, (err: any, data: any) => {
          if (err) throw Error(err);
          if (data['RT_ERROR']) throw Error((data as SoapError).RT_ERROR.$.ERROR_MESSAGE);
          res(data);
        });
      });
    });
  }
}