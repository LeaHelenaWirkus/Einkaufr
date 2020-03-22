import {UserCoordinate} from './UserCoordinate';


export class UserOffer {
  id: number;
  title: string;
  timestamp: number;
  userCoordinate: UserCoordinate;
  offerStatus: string;
  shoppingCart: string[];
}
