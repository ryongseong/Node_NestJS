/* eslint-disable prettier/prettier */
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('Board')
export class BoardController { 
    constructor(
        private readonly boardService: BoardService
    ){}

    @Get()
    findAll() { 
        return this.boardService.findAll();
    }

    @Get(':id')
    find(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.find(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@UserInfo() userInfo, @Body('content') content: string) {
        if (!userInfo) throw new UnauthorizedException();

        return this.boardService.create({
            userId: userInfo.id,
            content
        });
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) data: UpdateBoardDto
    ) {
        return this.boardService.update(userInfo.id, id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.boardService.delete(userInfo.id, id);
    }
}
