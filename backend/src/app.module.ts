import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaModule } from './agenda/agenda.module';
import { AgendaItemModule } from './agenda-item/agenda-item.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    })
    , AgendaModule, AgendaItemModule, UserModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
