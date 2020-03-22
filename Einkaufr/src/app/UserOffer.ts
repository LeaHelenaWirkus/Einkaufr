import {UserCoordinate} from './UserCoordinate';
import {ChatText} from './ChatText';


export class UserOffer {
  id: number;
  owner: string;
  helper: string;
  title: string;
  timestamp: number;
  userCoordinate: UserCoordinate;
  offerStatus: string;
  shoppingCart: string[];
  chatTexts: ChatText[];
}
