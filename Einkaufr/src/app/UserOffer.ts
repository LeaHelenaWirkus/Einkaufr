import {UserCoordinate} from './UserCoordinate';
import {ChatText} from './ChatText';


export class UserOffer {
  id: number;
  title: string;
  timestamp: number;
  coordinate: UserCoordinate;
  status: string;
  shoppingCart: string[];
  chatTexts: ChatText[];


  getId(): number {
    return this.id;
  }

  constructor(id: number, title: string, timestamp: number, coordinate: UserCoordinate,
              status: string, shoppingChart: string[], chatTexts: ChatText[]) {
    this.id = id;
    this.title = title;
    this.timestamp = timestamp;
    this.coordinate = coordinate;
    this.status = status;
    this.shoppingCart = shoppingChart;
    this.chatTexts = chatTexts;
  }

  getOfferStatus(): string {
    return this.status;
  }

  getShoppingCart(): string[] {
    return this.shoppingCart;
  }
}
