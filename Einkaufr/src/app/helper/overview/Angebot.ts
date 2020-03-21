export class Angebot{
  //private id: number;
  private beschreibung: string;
  private details: string;

  constructor( beschreibung: string, details: string){
    this.beschreibung=beschreibung;
    //this.id=id;
    this.details=details;
  }

  getBeschreibung() :string{
    return this.beschreibung;
  }
  //getId() :number{
    //return this.id;
  //}
  getDetails():string{
    return this.details;
  }
}
