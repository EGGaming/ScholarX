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
          events: t.CalendarListing.EventLists[0]?.EventList?.map((event) => event.$) ?? [],
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

  public gradebook(reportingPeriodIndex?: number): Promise<Gradebook> {
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'Gradebook',
          {
            childIntID: 0,
            ...(reportingPeriodIndex != null && { ReportPeriod: reportingPeriodIndex }),
          }
        );

        const t = await SoapClient.parseString<GradebookXMLObject>(data);
        res({
          error: t.Gradebook.$.Error,
          currentPeriod: {
            name: t.Gradebook.ReportingPeriod[0].$.GradePeriod,
            date: {
              start: new Date(t.Gradebook.ReportingPeriod[0].$.StartDate).toISOString(),
              end: new Date(t.Gradebook.ReportingPeriod[0].$.EndDate).toISOString(),
            },
          },
          periods: t.Gradebook.ReportingPeriods[0].ReportPeriod.map(({ $ }) => ({
            name: $.GradePeriod,
            index: Number($.Index),
            date: {
              start: new Date($.StartDate).toISOString(),
              end: new Date($.EndDate).toISOString(),
            },
          })),
          classes: t.Gradebook.Courses[0].Course.map((course, i) => {
            return {
              staff: {
                staffgu: course.$.StaffGU,
                name: course.$.Staff,
                email: course.$.StaffEMail,
              },
              room: course.$.Room,
              grade: {
                raw: course.Marks[0].Mark[0].$.CalculatedScoreRaw,
                symbol: course.Marks[0].Mark[0].$.CalculatedScoreString,
              },
              period: Number(course.$.Period),
              name: course.$.Title,
              assignments:
                course.Marks[0].Mark[0].Assignments[0].Assignment?.map((assignment) => ({
                  date: {
                    date: new Date(assignment.$.Date).toISOString(),
                    dueDate: new Date(assignment.$.DueDate).toISOString(),
                    dropbox: {
                      start: new Date(assignment.$.DropStartDate).toISOString(),
                      end: new Date(assignment.$.DropEndDate).toISOString(),
                    },
                  },
                  description: assignment.$.MeasureDescription,
                  name: assignment.$.Measure,
                  hasDropBox: JSON.parse(assignment.$.HasDropBox),
                  notes: assignment.$.Notes,
                  type: assignment.$.Type,
                  points: assignment.$.Points.replace(/\.0+/g, ''),
                  score: {
                    type: assignment.$.ScoreType,
                    value: assignment.$.Score.replace(/\.0+/g, ''),
                  },
                  gradebookId: assignment.$.GradebookID,
                  studentId: assignment.$.StudentID,
                  teacherId: assignment.$.TeacherID,
                  resources: assignment.Resources[0].Resource?.map(({ $ }) => ({
                    file: {
                      type: $.FileType!,
                      name: $.FileName!,
                      serverRoute: $.ServerFileName,
                    },
                    resource: {
                      id: $.ResourceID,
                      name: $.ResourceName,
                      date: $.ResourceDate,
                      description: $.ResourceDescription,
                    },
                    url: $.URL,
                    sequence: $.Sequence,
                    classId: $.ClassID,
                    gradebookId: $.GradebookID,
                    type: $.Type,
                  })),
                })) ?? [],
            };
          }),
        });
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  public classSchedule(semester?: number): Promise<Schedule> {
    return new Promise(async (res) => {
      try {
        const data = await this.client.processRequest(
          this.username,
          this.password,
          Service.PXPWebServices,
          'StudentClassList',
          {
            childIntID: 0,
            ...(semester && { TermIndex: semester - 1 }),
          }
        );

        const { StudentClassSchedule } = await SoapClient.parseString<StudentClassScheduleXMLObject>(data);
        res({
          currentTerm: {
            name: StudentClassSchedule.$.TermIndexName,
            index: Number(StudentClassSchedule.$.TermIndex),
            code: Number(StudentClassSchedule.$.TermIndex) + 1,
          },
          classes: StudentClassSchedule.TodayScheduleInfoData[0].SchoolInfos[0].SchoolInfo[0].Classes[0].ClassInfo.map(
            ({ $: obj }) => ({
              name:
                StudentClassSchedule.ClassLists[0].ClassListing.find(({ $ }) => $.SectionGU === obj.SectionGU)?.$
                  .CourseTitle ?? '',
              period: Number(obj.Period),
              room: obj.RoomName,
              sectiongu: obj.SectionGU,
              time: {
                start: obj.StartTime,
                end: obj.EndTime,
              },
              date: {
                start: obj.StartDate,
                end: obj.EndDate,
              },
              teacher: {
                name: obj.TeacherName,
                email: obj.TeacherEmail,
                staffgu: obj.StaffGU,
              },
            })
          ),
          terms: StudentClassSchedule.TermLists[0].TermListing.map((obj) => ({
            term: {
              name: obj.$.TermName,
              code: Number(obj.$.TermCode),
              index: Number(obj.$.TermIndex),
            },
            schoolYearTermCodeGU: obj.$.SchoolYearTrmCodeGU,
            beginDate: new Date(obj.$.BeginDate).toISOString(),
            endDate: new Date(obj.$.EndDate).toISOString(),
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
