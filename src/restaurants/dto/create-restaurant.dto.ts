import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schema/restaurant.schema';

export class CreateRestaurantDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;
}
