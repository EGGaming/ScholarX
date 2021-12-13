import soap from 'soap';
import xml2json from 'xml2js';

class Client {
  private username: string;
  private password: string;
  private client: soap.Client;
  constructor(username: string, password: string, client: soap.Client) {
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

  public getClient() {
    return this.client;
  }
}

export default Client;
