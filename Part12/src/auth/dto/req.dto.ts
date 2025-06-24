import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({
    required: true,
    example: 'test@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,30}$/, {
    message:
      'Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,30}$/, {
    message:
      'Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  ß;
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({
    required: true,
    example: 'test@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password1!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,30}$/, {
    message:
      'Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}
