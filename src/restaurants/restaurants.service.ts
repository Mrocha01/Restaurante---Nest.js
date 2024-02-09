import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schema/restaurant.schema';
import mongoose from 'mongoose';
import { CreateRestaurantDTO } from './create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //Create a new Restaurant => Post /restaurants
  async createRestaurant(
    createRestaurantDto: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.create(createRestaurantDto);

    return restaurant;
  }

  //Get all restaurants => GET /restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurant = await this.restaurantModel.find();

    return restaurant;
  }
}
