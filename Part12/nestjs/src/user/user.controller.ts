import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from './enum/user.enum';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, FindUserResDto, PageReqDto)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiGetResponse(FindUserResDto)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  findAll(@Query() { page, size }: PageReqDto, @User() user: UserAfterAuth) {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  findOne(@Param() { id }: FindUserReqDto) {
    return this.userService.findOne(id);
  }
}
