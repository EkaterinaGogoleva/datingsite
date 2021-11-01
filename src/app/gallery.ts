
export class Gallery {
  constructor(
    public _id: string,
  public imageUrl: string,
  public imageTitle: string,
  public imageDesc: string,
  public uploaded: Date){}
}