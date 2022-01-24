export interface DistrictInfo {
  Address: string;
  DistrictID: string;
  Name: string;
  PvueURL: string;
}

export interface DistrictObject {
  DistrictLists: {
    DistrictInfos: {
      DistrictInfo: {
        $: DistrictInfo;
      }[];
    }[];
  };
}

export interface EmergencyContact {
  HomePhone: string;
  MobilePhone: string;
  Name: string;
  OtherPhone: string;
  Relationship: string;
  WorkPhone: string;
}

export interface Dentist {
  Extn: string;
  Name: string;
  Office: string;
  Phone: string;
}

export interface StudentInfo {
  $: {
    ShowPhysicianAndDentistInfo: string;
    ShowStudentInfo: string;
    Type: string;
    'xmlns:xsd': string;
    'xmlns:xsi': string;
  };
  Address: string[];
  BirthDate: string[];
  CounselorEmail: string[];
  CounselorName: string[];
  CounselorStaffGU: string[];
  CurrentSchool: string[];
  Dentist: {
    $: Dentist;
  }[];
  EMail: string[];
  EmergencyContacts: {
    EmergencyContact: {
      $: EmergencyContact;
    }[];
  }[];
  FormattedName: string[];
  Gender: string[];
  Grade: string[];
  HomeLanguage: string[];
  HomeRoom: string[];
  HomeRoomTch: string[];
  HomeRoomTchEMail: string[];
  HomeRoomTchStaffGU: string[];
  LastNameGoesBy: string[];
  LockerInfoRecords: string[];
  NickName: string[];
  OrgYearGU: string[];
  PermID: string[];
  Phone: string[];
  Photo: string[];
  Physician: {
    $: {
      Extn: string[];
      Hospital: string[];
      Name: string[];
      Phone: string[];
    };
  }[];
  Track: string[];
  UserDefinedGroupBoxes: {
    UserDefinedGroupBox: {
      $: {
        GroupBoxID: string;
        GroupBoxLabel: string;
        VCID: string;
      };
      UserDefinedItems: {
        $: {
          ItemLabel: string;
          ItemType: string;
          SourceElement: string;
          SourceObject: string;
          VCID: string;
        };
      }[];
    }[];
  }[];
}

export interface MessageListingXML {
  xml: string;
}

export interface Message {
  $: {
    BeginDate: string;
    Content: string;
    Deletable: string;
    Email: string;
    From: string;
    ID: string;
    IconURL: string;
    Module: string;
    Read: string;
    SMMsgPersonGU: string;
    StaffGU: string;
    Subject: string;
    SubjectNoHTML: string;
    Type: string;
  };
  AttachmentDatas: {
    AttachmentName: string;
    SmAttachmentGU: string;
  }[];
}

export interface PXPMessagesData {
  PXPMessagesData: {
    $: {
      SupportingSynergyMail: string;
      'xmlns:xsd': string;
      'xmlns:xsi': string;
    };
    MessageListings: {
      MessageListing: Message[];
    }[];
  };
}

export interface CalendarListing {
  $: {
    MonthBegDate: string;
    MonthEndDate: string;
    SchoolBegDate: string;
    SchoolEndDate: string;
    'xmlns:xsd': string;
    'xmlns:xsi': string;
  };
  EventLists: {
    EventList: CalendarEventLists[];
  }[];
}

export interface Calendar {
  meta: {
    MonthBegDate: string;
    MonthEndDate: string;
    SchoolBegDate: string;
    SchoolEndDate: string;
  };
  events: CalendarEvent[];
}

export type CalendarEvent =
  | { Date: string; DayType: string; StartTime: string; Title: string }
  | {
      AGU: string;
      AddLinkData: string;
      DGU: string;
      Date: string;
      DayType: string;
      Icon: string;
      Link: string;
      StartTime: string;
      Title: string;
      ViewType: string;
    };

export type CalendarEventLists =
  | {
      $: {
        Date: string;
        DayType: string;
        StartTime: string;
        Title: string;
      };
    }
  | {
      $: {
        AGU: string;
        AddLinkData: string;
        DGU: string;
        Date: string;
        DayType: string;
        Icon: string;
        Link: string;
        StartTime: string;
        Title: string;
        ViewType: string;
      };
    };
