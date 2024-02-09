import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schema/restaurant.schema';
import { CreateRestaurantDTO } from './create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Post('create')
  async create(
    @Body() createRestaurantDto: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  @Get('all')
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }
}
