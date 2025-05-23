import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as morgan from "morgan";
import { ConfigService } from "@nestjs/config";
import { CORS } from "@/Constants";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan("dev"));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);

  app.enableCors(CORS);

  app.setGlobalPrefix("api");

  const port = configService.get("PORT") ?? 3001;
  await app.listen(port, () => console.log("Server is running on port " + port));
}
bootstrap();
