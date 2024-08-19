import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        logging: false,
      });
      sequelize.addModels([User]);
      // TODO use for test and develop reason, need to use migration in production
      await sequelize.sync();
      return sequelize;
    },
  },
];
