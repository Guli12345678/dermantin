import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { AdminsModule } from "./admins/admins.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DermantinModule } from "./dermantin/dermantin.module";
import { DermantinImagesModule } from "./dermantin_images/dermantin_images.module";
import { AdvertisementsModule } from "./advertisements/advertisements.module";
import { StoresModule } from "./stores/stores.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { RequestModule } from "./request/request.module";
import { ChatModule } from "./chat/chat.module";
import { HistoryModule } from "./history/history.module";
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    CategoryModule,
    AdminsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        logging: false,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    DermantinModule,
    DermantinImagesModule,
    AdvertisementsModule,
    StoresModule,
    ReviewsModule,
    RequestModule,
    ChatModule,
    HistoryModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
