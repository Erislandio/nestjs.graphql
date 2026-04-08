import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './app.resolver';
import { UserService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: {
        federation: 1,
      },
    }),
  ],
  providers: [UserService, UserResolver],
})
export class AppModule {}
