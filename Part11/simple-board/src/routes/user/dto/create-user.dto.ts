/* eslint-disable prettier/prettier */

import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;
    
    @MinLength(2)
    @IsNotEmpty()
    name: string;
}