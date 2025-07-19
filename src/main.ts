import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function start() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const PORT = config.get<number>("PORT");
  await app.listen(PORT ?? 3001, () => {
    console.log(
      " + 💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗 +"
    );
    console.log(
      `💌                                                                      💌`
    );
    console.log(
      `💌                Server started at: http://localhost:${PORT}              💌`
    );
    console.log(
      `💌                                                                      💌`
    );
    console.log(
      " + 💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗 +"
    );
  });
}
start();
