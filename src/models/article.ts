export interface IArticle {
  id: string;
  name: string;
  created: Date;
}

export class Article implements  IArticle {
  constructor(public id: string, public name: string, public created: Date = new Date()) {
  }
}
