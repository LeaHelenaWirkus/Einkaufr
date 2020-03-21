export class UserOffer {


  private id: number;
  private timestamp: number;
  private coordinate: string;
  private status: string;
  private list: string[];

  constructor(id: number, timestamp:number, coordinate:string, status:string, list:string[]) {
    this.id = id;
    this.timestamp = timestamp;
    this.coordinate = coordinate;
    this.status = status;
    this.list = list;
  }
}
