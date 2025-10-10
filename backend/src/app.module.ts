import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaModule } from './agenda/agenda.module'; // Ensure this is imported

@Module({
  imports: [
    // 1. Root TypeORM Connection Setup
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'agenda.db',
      // 2. Use glob pattern to automatically find all .entity.ts files
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // IMPORTANT: Set to false for production
      autoLoadEntities: true,
    }),
    // 3. Import the feature module containing the service logic
    AgendaModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
