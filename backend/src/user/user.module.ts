import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), //Registers the User Entity and provides the Repository
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}