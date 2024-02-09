import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schema/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get('all')
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }
}
