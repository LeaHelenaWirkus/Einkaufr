import {UserCoordinate} from "./UserCoordinate";


export class UserOffer {
  private _id: number;
  timestamp: number;
  userCoordinate: UserCoordinate;
  private _offerStatus: string;
  private _shoppingCart: string[];


  get id(): number {
    return this._id;
  }

  get offerStatus(): string {
    return this._offerStatus;
  }

  get shoppingCart(): string[] {
    return this._shoppingCart;
  }
}
