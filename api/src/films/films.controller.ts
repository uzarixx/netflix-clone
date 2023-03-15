import { Body, Controller, Post, } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/create-films.dto';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {
  }

  @Post('/create-film')
  createFilm(@Body() dto: CreateFilmsDto) {
    return this.filmsService.createFilm(dto);
  }
}
