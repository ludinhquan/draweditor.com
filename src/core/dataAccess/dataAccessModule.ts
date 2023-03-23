import {DataSource, DataSourceManagement} from "@draweditor.com/dataAccess";
import {Module} from "@nestjs/common";

@Module({
  providers: [
    {provide: DataSource, useClass: DataSourceManagement}
  ],
  exports: [DataSource]
})
export class DataAccessModule {}
