import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schema/restaurant.schema';
import mongoose from 'mongoose';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { Query } from 'express-serve-static-core';
import APIFeatures from '../../utils/apiFeatures.util';

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
    const isValidPhoneNumber = createRestaurantDto.phoneNumber;

    if (!Number(isValidPhoneNumber)) {
      throw new BadRequestException('Phone number must contain only numbers');
    }

    const location = await APIFeatures.getRestaurantLocation(
      createRestaurantDto.address,
    );

    const data = Object.assign(createRestaurantDto, { location });

    const restaurant = await this.restaurantModel.create(data);

    return restaurant;
  }

  //Get all restaurants => GET /restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const restaurant = await this.restaurantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return restaurant;
  }

  //Get a restaurant by ID => GET /restaurants/{id}
  async getRestaurantById(id: string): Promise<Restaurant> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong mongoose ID error');
    }

    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  //Update a restaurant by ID => PUT /restaurants/{id}
  async updateRestaurantById(
    id: string,
    restaurant: Restaurant,
  ): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  //Delete a restaurant by ID => DELETE /restaurants/{id}
  async deleteRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findByIdAndDelete(id);

    return restaurant;
  }
}
