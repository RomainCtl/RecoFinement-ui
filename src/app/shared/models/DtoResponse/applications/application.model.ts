import { CategorieDto } from '../../Categorie/categorie.model';

export class Application {

  type: string;
  rating: number;
  android_version: string;
  last_updated: string;
  price: string;
  installs: string;
  categorie: CategorieDto;
  name: string;
  current_version: string;
  size: string;
  content_rating: string;
  reviews: number;

  constructor(app_id: string ) {}

}
