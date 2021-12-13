import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap/';
import { StudentInfo } from './types';

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

  public async studentInfo(): Promise<StudentInfo['StudentInfo']> {
    const data = await this.client.processRequest(this.username, this.password, Service.PXPWebServices, 'StudentInfo', {
      ChildIntID: 0,
    });

    return (await SoapClient.parseString<StudentInfo>(data)).StudentInfo;
  }
}

export default Client;
