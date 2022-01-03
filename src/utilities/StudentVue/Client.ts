import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap/';
import { Message, PXPMessagesData, StudentInfo } from './types';

enum Service {
  PXPWebServices = 'PXPWebServices',
}

class Client {
  private username: string;
  private password: string;
  private client: SoapClient;
  constructor(username: string, password: string, client: SoapClient) {
    this.username = username;
    this.password = password;
    this.client = client;
  }

  public getUsername() {
    return this.username;
  }

  public getPassword() {
    return this.password;
  }

  public studentInfo(): Promise<StudentInfo> {
    return new Promise(async (res, rej) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'StudentInfo',
          {
            ChildIntID: 0,
          }
        );

        const t = await SoapClient.parseString<StudentInfo>(data);
        res((t as any).StudentInfo);
      } catch (e) {
        rej(new Error(e as any));
      }
    });
  }

  public async messages(): Promise<Message[]> {
    try {
      const data = await this.client.processRequest(
        this.username,
        this.password,
        Service.PXPWebServices,
        'GetPXPMessages',
        {
          childIntID: 0,
        }
      );

      const t = await SoapClient.parseString<PXPMessagesData>(data);
      return t.PXPMessagesData.MessageListings[0].MessageListing;
    } catch (e) {
      throw Error(e as any);
    }
  }
}

export default Client;
