/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    private boards = [
        {
            id: 1,
            name: 'name1',
            content: 'content1'
        },
        {
            id: 2,
            name: 'name2',
            content: 'content2'
        },
        {
            id: 3,
            name: 'name3',
            content: 'content3'
        },
        {
            id: 4,
            name: 'name4',
            content: 'content4'
        }
    ]

    findAll() {
        return this.boards;
    }

    find(id: number) {
        const index = this.getBoardId(id);
        return this.boards[index]
    }

    create(data: CreateBoardDto) {
        const newBoard = { id: this.getNextId(), ...data };
        this.boards.push(newBoard);
        return newBoard;
    }
    
    update(id: number, data: UpdateBoardDto) {
        const index = this.getBoardId(id);
        if (index > -1) {
            this.boards[index] = {
                ...this.boards[index],
                ...data
            };
            return this.boards[index];
        }

        return null;
    }

    remove(id: number) {
        const index = this.getBoardId(id);
        if (index > -1) {
            const deleteBoard = this.boards[index];
            this.boards.splice(index, 1);
            return deleteBoard;
        }
        return null;
    }

    getBoardId(id: number) {
        return this.boards.findIndex((board) => board.id === id);        
    }

    getNextId() {
        return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
    }
} 
