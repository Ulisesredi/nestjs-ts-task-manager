import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorHandler extends Error {
  constructor({ type, message }: { type: keyof typeof HttpStatus; message: string }) {
    super(`${type} : ${message}`);
  }

  public static createSignatureError(message: string) {
    const errorCode = message.split(" : ")[0];
    if (errorCode) {
      throw new HttpException(message, HttpStatus[errorCode]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
