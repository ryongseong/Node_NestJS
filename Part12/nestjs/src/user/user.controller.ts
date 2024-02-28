import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from './enum/user.enum';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, FindUserResDto, PageReqDto)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiGetResponse(FindUserResDto)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async findAll(@Query() { page, size }: PageReqDto): Promise<FindUserResDto[]> {
    const users = await this.userService.findAll(page, size);
    return users.map(({ id, email, createdAt }) => {
      return { id, email, createdAt: createdAt.toISOString() };
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  findOne(@Param() { id }: FindUserReqDto) {
    return this.userService.findOne(id);
  }

  @Public()
  @Post('bulk')
  createBulk() {
    return this.userService.createBulk();
  }
}
