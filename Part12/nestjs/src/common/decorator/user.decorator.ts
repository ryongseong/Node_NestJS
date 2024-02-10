import { ExecutionContext } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(( data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});

export interface UserAfterAuth {
    id: string;
}