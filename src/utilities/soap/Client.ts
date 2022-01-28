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

interface IProcessWebServiceRequestMultiWeb extends IProcessWebServiceRequest {
  webDBName: string;
}

function parseParam(input: Object | string): string {
  let paramStr = '<Parms>';
  switch (typeof input) {
    case 'object':
    default:
      Object.entries(input).forEach(([key, value]) => {
        paramStr += '<' + key + '>';
        paramStr += value;
        paramStr += '</' + key + '>';
      });
      break;
    case 'string':
      break;
  }
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
    params: Object | string,
    serviceRequest: 'ProcessWebServiceRequest' | 'ProcessWebServiceRequestMultiWeb' = 'ProcessWebServiceRequest'
  ): Promise<string> {
    return new Promise((res) => {
      const paramStr = parseParam(params);
      const xml = (() => {
        switch (serviceRequest) {
          case 'ProcessWebServiceRequest':
            return builder.buildObject({
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
                      skipLoginLog: 0,
                      parent: 0,
                      webServiceHandleName: serviceName,
                      methodName,
                      paramStr,
                    } as IProcessWebServiceRequest),
                  },
                },
              },
            });
          case 'ProcessWebServiceRequestMultiWeb':
            return builder.buildObject({
              'soap:Envelope': {
                $: {
                  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                  'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                  'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
                },
                'soap:Body': {
                  ProcessWebServiceRequestMultiWeb: {
                    $: {
                      xmlns: 'http://edupoint.com/webservices/',
                    },
                    ...({
                      userID: username,
                      password: password,
                      skipLoginLog: 0,
                      parent: 0,
                      webServiceHandleName: serviceName,
                      webDBName: '',
                      methodName,
                      paramStr,
                    } as IProcessWebServiceRequestMultiWeb),
                  },
                },
              },
            });
        }
      })();

      axios
        .post(this.postUrl, xml, {
          headers: { 'Content-Type': 'text/xml', 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' },
        })
        .then((results) => res(results.data))
        .catch(console.error);
    });
  }

  public static parseString<Result>(xml: string): Promise<Result> {
    return new Promise((res, rej) => {
      parser.parseString(xml, (err: any, data: any) => {
        if (err) rej(new Error(err));

        const l =
          data['soap:Envelope']['soap:Body'][0].ProcessWebServiceRequestResponse[0].ProcessWebServiceRequestResult[0];

        parser.parseString(l, (err: any, data: any) => {
          if (err) rej(new Error(err));
          if (data['RT_ERROR']) throw Error((data as SoapError).RT_ERROR.$.ERROR_MESSAGE);
          res(data);
        });
      });
    });
  }

  public static parseXml(tagName: string, tags: Record<string, unknown>): string {
    const xml = builder.buildObject({
      [tagName]: tags,
    });

    return xml;
  }
}
