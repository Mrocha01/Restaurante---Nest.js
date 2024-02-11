import { Category } from '../schema/restaurant.schema';

export class UpdateRestaurantDto {
  readonly name: string;

  readonly description: string;

  readonly email: string;

  readonly phoneNumber: string;

  readonly adress: string;

  readonly category: Category;
}
