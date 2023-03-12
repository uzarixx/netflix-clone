import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/create-films.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {
  }

  @Post('/create-film')
  createFilm(@Body() dto: CreateFilmsDto) {
    return this.filmsService.createFilm(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-film/:id')
  getFilmByContentId(@Param('id') id: number) {
    return this.filmsService.getFilmByContentId(id);
  }
}
