import {applyDecorators, UseFilters, UseInterceptors} from "@nestjs/common";
import {HttpExceptionFilter} from "./httpExceptionFilter";
import {HttpInterceptor} from "./httpInterceptor";

export function Http() {
  return applyDecorators(
    UseFilters(HttpExceptionFilter),
    UseInterceptors(HttpInterceptor)
  )
} 
