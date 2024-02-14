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

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;
}
