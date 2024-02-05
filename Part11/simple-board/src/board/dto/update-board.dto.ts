/* eslint-disable prettier/prettier */

import { IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateBoardDto {
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    name?: string;

    @IsOptional()
    content?: string;
}
