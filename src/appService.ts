import {DomainModel} from "@draweditor.com/core";
import {EventBus, IEventBus} from "@draweditor.com/eventBus";
import {Inject} from "@nestjs/common";
import {IAppService} from "./IAppService";
import * as schemas from './schemas';

export class AppServiceImpl implements IAppService {
  constructor(
    @Inject(EventBus) private eventBus: IEventBus
  ) {}

  async register() {
    DomainModel.create(Object.values(schemas));

    await Promise.all([
      // this.eventBus.register()
    ])
  }

  async destroy() {
    await Promise.all([
      this.eventBus.destroy()
    ])
  }
}
