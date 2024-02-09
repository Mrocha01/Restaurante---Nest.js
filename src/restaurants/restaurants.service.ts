import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schema/restaurant.schema';
import mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //Get all restaurants => GET /restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurant = await this.restaurantModel.find();

    return restaurant;
  }
}
