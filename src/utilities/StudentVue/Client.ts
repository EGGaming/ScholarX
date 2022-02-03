import xml2js from 'react-native-xml2js';
import { Client as SoapClient } from '../soap/';
import Status from './Status';
import {
  Attachment,
  AttachmentXML,
  Calendar,
  CalendarListing,
  Gradebook,
  GradebookXMLObject,
  Message,
  MessageListingXML,
  PXPMessagesData,
  Schedule,
  StudentClassAssignment,
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

  public gradebook(): Promise<any> {
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'Gradebook',
          {
            childIntID: 0,
          }
        );

        const t = await SoapClient.parseString<GradebookXMLObject>(data);
        res({
          error: t.Gradebook.$.Error,
          classes: t.Gradebook.Courses.map((course, i) => {
            const meta = course.Course[i];
            return {
              staff: {
                staffgu: meta.$.StaffGU,
                name: meta.$.Staff,
                email: meta.$.StaffEmail,
              },
              room: meta.$.Room,
              grade: {
                raw: meta.Marks[0].Mark[0].$.CalculatedScoreRaw,
                symbol: meta.Marks[0].Mark[0].$.CalculatedScoreString,
              },
              period: Number(meta.$.Period),
              name: meta.$.Title,
              assignments: meta.Marks[0].Mark[0].Assignments[0]['Assignment'].map((assignment) => ({
                date: {
                  date: new Date(assignment.$.Date),
                  dueDate: new Date(assignment.$.DueDate),
                  dropbox: {
                    start: new Date(assignment.$.DropStartDate),
                    end: new Date(assignment.$.DropEndDate),
                  },
                },
                description: assignment.$.MeasureDescription,
                name: assignment.$.Measure,
                hasDropBox: Boolean(assignment.$.HasDropBox),
                notes: assignment.$.Notes,
                points: assignment.$.Points,
                score: assignment.$.Score,
                type: assignment.$.ScoreType,
                gradebookId: assignment.$.GradebookID,
                studentId: assignment.$.StudentID,
                teacherId: assignment.$.TeacherID,
              })),
            };
          }),
        });
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  public classSchedule(semester: number): Promise<Schedule> {
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

        const { StudentClassSchedule } = await SoapClient.parseString<StudentClassScheduleXMLObject>(data);
        res({
          currentTerm: {
            name: StudentClassSchedule.$.TermIndexName,
            index: Number(StudentClassSchedule.$.TermIndex),
            code: Number(StudentClassSchedule.$.TermIndex) + 1,
          },
          classes: StudentClassSchedule.ClassLists[0].ClassListing.map((obj) => ({
            name: obj.$.CourseTitle,
            period: Number(obj.$.Period),
            room: obj.$.RoomName,
            sectiongu: obj.$.SectionGU,
            teacher: {
              name: obj.$.Teacher,
              email: obj.$.TeacherEmail,
              staffgu: obj.$.TeacherStaffGU,
            },
          })),
          terms: StudentClassSchedule.TermLists[0].TermListing.map((obj) => ({
            term: {
              name: obj.$.TermName,
              code: Number(obj.$.TermCode),
              index: Number(obj.$.TermIndex),
            },
            schoolYearTermCodeGU: obj.$.SchoolYearTrmCodeGU,
            beginDate: new Date(obj.$.BeginDate),
            endDate: new Date(obj.$.EndDate),
          })),
          error: StudentClassSchedule.$.ErrorMessage,
        });
      } catch (e) {
        throw Error(e as any);
      }
    });
  }
}

export default Client;
