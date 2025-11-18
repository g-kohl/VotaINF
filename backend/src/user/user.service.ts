import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly saltRounds = 10; // define a complexidade do hashing da senha
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // --- USER CREATION ---
  async create(userData: any): Promise<Omit<User, 'password'>> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
      const entityData = { ...userData, password: hashedPassword };

      const newUser = this.usersRepository.create(entityData);
      const savedUser = await this.usersRepository.save(newUser) as unknown as User; 
      
      console.log(`[USER-SERVICE] User saved to DB: ID ${savedUser.id}, Name: ${savedUser.name}`);
      
      // FIX: Use object destructuring to omit the password property before returning.
      const { password, ...result } = savedUser; 
      return result as Omit<User, 'password'>; // Return the user object without the hash
      
    } catch (error) {
      console.error("Database save failed:", error);
      throw new InternalServerErrorException('Could not save user to database.');
    }
  }

  // --- AUTHENTICATION ---
  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> { // NOTE: Changed return type
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      // FIX: Use object destructuring to omit the password property before returning.
      const { password, ...result } = user;
      return result as Omit<User, 'password'>; // Return the user object without the hash
    }
    
    return null;
  }

  // --- SEEDING ---
  async onModuleInit() {
    await this.seedInitialUsers();
  }

  async seedInitialUsers(): Promise<void> {
    const count = await this.usersRepository.count();
    
    if (count === 0) {
      console.log("[SEEDING] Database estava vazia, adicionando exemplos...");
      
      const sampleUsersData = [
        { name: 'Admin User', email: 'admin', role: 'admin', password: '123' }, 
        { name: 'User padrão', email: 'user', role: 'user', password: '123' }, 
      ];
      
      const hashedUsersPromises = sampleUsersData.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
          return { ...user, password: hashedPassword };
      });

      const hashedUsers = await Promise.all(hashedUsersPromises);

      const entities = this.usersRepository.create(hashedUsers);
      await this.usersRepository.save(entities);
      
      console.log(`[SEEDING] Successfully inserted ${sampleUsersData.length} sample users.`);
    } else {
      console.log(`[SEEDING] Database already contains ${count} users. Skipping seed.`);
    }
  }
}