import { CategorieDto } from '../../Categorie/categorie.model';

export class Application {

  private type: string;
  private rating: number;
  private android_version: string;
  private last_updated: string;
  private price: string;
  private installs: string;
  private categorie: CategorieDto;
  private name: string;
  private current_version: string;
  private size: string;
  private content_rating: string;
  private reviews: number;

  constructor(public app_id: string ) {}

}
