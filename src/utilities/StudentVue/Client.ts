import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap/';
import Status from './Status';
import {
  Attachment,
  AttachmentXML,
  Calendar,
  CalendarListing,
  Message,
  MessageListingXML,
  PXPMessagesData,
  StudentClassScheduleXMLObject,
  StudentInfo,
} from './types';
import { format } from 'date-fns';

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

  public async updateMessage(messageListing: Message): Promise<Status> {
    return new Promise(async (res) => {
      const MessageListing = SoapClient.parseXml('MessageListing', {
        ID: messageListing.$.ID,
        Type: messageListing.$.Type,
        MarkAsRead: 'true',
      });

      try {
        await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'UpdatePXPMessage',
          MessageListing
        );
        res(Status.OK);
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  public calendar(date: Date | number): Promise<Calendar> {
    // date has to be in format MM/DD/YYYY
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'StudentCalendar',
          {
            childIntID: 0,
            RequestDate: format(date, 'M/dd/yyyy'),
          }
        );

        const t = await SoapClient.parseString<{ CalendarListing: CalendarListing }>(data);
        res({
          meta: {
            MonthBegDate: t.CalendarListing.$.MonthBegDate,
            MonthEndDate: t.CalendarListing.$.MonthEndDate,
            SchoolBegDate: t.CalendarListing.$.SchoolBegDate,
            SchoolEndDate: t.CalendarListing.$.SchoolEndDate,
          },
          events: t.CalendarListing.EventLists[0].EventList.map((event) => event.$),
        });
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  public attachment(SmAttachmentGU: string): Promise<Attachment> {
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'SynergyMailGetAttachment',
          {
            childIntID: 0,
            SmAttachmentGU,
          }
        );

        const t = await SoapClient.parseString<AttachmentXML>(data);
        res({
          name: t.AttachmentXML.$.DocumentName,
          base64: t.AttachmentXML.Base64Code[0],
        });
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  public classSchedule(semester: number): Promise<any> {
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'StudentClassList',
          {
            childIntID: 0,
            TermIndex: semester - 1,
          }
        );

        const t = await SoapClient.parseString<StudentClassScheduleXMLObject>(data);
        res(t);
      } catch (e) {
        throw Error(e as any);
      }
    });
  }
}

export default Client;
