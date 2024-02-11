import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schema/restaurant.schema';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

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

  @Get(':id')
  async getRestaurantById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restaurantsService.getRestaurantById(id);

    return this.restaurantsService.updateRestaurantById(id, restaurant);
  }
}
