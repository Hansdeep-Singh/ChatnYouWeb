export class userModel {
  constructor(
    public emailAddress: string,
    public userName: string,
    public passWord: string,
    public gender: string,
    public age: number,
    public countryId: number,
    public cityId: number
  ) {}
}
