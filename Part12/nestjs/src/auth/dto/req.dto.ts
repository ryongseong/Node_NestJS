/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches, MaxLength } from "class-validator";

export class SignupReqDto {
    @ApiProperty({ required: true, example: 'nestjs@example.com' })
    @IsEmail()
    @MaxLength(30)
    email: string;
    
    @ApiProperty({ required: true, example: 'Password1!' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{10,30}$/)
    password: string;
    
    @ApiProperty({ required: true, example: 'Password1!' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{10,30}$/)
    passwordConfirm: string;
}

export class SigninReqDto {
    @ApiProperty({ required: true, example: 'nestjs@example.com' })
    @IsEmail()
    @MaxLength(30)
    email: string;
    
    @ApiProperty({ required: true, example: 'Password1!' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{10,30}$/)
    password: string;
}