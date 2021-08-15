export class Profile {
  // konstruktorimetodi joka rakentaa student-olion
  constructor(
      public _id: string, // mongon lisäämä _id
      public name: string,
      public gender: string,
      public date_of_birth: Date,
      public children: string,
      public marital_status: string,
      public height: string,
      public country: string,
      public education: string,
      public profession: string,
      public smoker: string,
      public email: string,
      public about_myself: string,
      public wanted: Array<{}>) { }
}
