/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from './entity/user.entity';

class MockRepository {
    async findOneBy(query) {
        const user: User = new User();
        user.email = query.email;
        return user;
    }
}
describe('User', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockRepository,
                },
            ]
        }).compile();
        userService = module.get<UserService>(UserService);
    });

    it('should', async () => {
        const email = 'nestjs@example.com';
        const result = await userService.findOneByEmail(email);
        expect(result.email).toBe(email);
    })
})