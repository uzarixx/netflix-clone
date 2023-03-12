import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentCreateDto } from './dto/content-create.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/create-content')
  createContent(@Body() dto: ContentCreateDto) {
    return this.contentService.createContent(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getContent() {
    return this.contentService.getContent();
  }
}
