import {Injectable} from "@nestjs/common";
import {IAppService} from "./IAppService";
import { DomainModel } from "@draweditor.com/core";
import * as schemas from './schemas'

@Injectable()
export class AppServiceImpl implements IAppService{
  registerSchemas(): void {
    DomainModel.create(Object.values(schemas));
  }
}
