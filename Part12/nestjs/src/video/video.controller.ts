/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetItemsResponse, ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { PageResDto } from 'src/common/dto/res.dto';

@ApiTags('Video')
@ApiExtraModels(FindVideoReqDto, FindVideoResDto, PageReqDto, CreateVideoResDto, PageResDto)
@Controller('api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiPostResponse(CreateVideoResDto)
  @ApiBearerAuth()
  upload(@Body() createVieoReqDto: CreateVideoReqDto) {
    return this.videoService.create();
  }
  
  @Get()
  @ApiGetItemsResponse(FindVideoResDto)
  @ApiBearerAuth()
  findAll(@Query() { page, size }: PageReqDto) {
    return this.videoService.findAll();
  }
  
  @Get(':id')
  @ApiGetResponse(FindVideoResDto)
  @ApiBearerAuth()
  findOne(@Param() { id }: FindVideoReqDto) {
    return this.videoService.findOne(id);
  }
  
  @Get(':id/download')
  @ApiBearerAuth()
  async download(@Param() { id }: FindVideoReqDto) {
    return this.videoService.download(id);
  }
}
