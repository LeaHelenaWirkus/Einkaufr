import {UserCoordinate} from "./UserCoordinate";


export class UserOffer {
  id: number;
  timestamp: number;
  userCoordinate: UserCoordinate;
  offerStatus: string;
  shoppingCart: string[];
}
