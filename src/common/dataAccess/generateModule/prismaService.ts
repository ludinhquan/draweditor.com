import {Attribute, AttributeType, DataModel, executeCommand, RelationType, writeFile} from "@draweditor.com/core";
import {Injectable} from "@nestjs/common";

type GenerateOptions = Partial<{
  schemaPath: string,
  dataSource: {provider: string, url: string},
  client: {output: string},
}>

@Injectable()
export class PrismaService {
  constructor() {}

  private dataTypes: Record<AttributeType, string> = {
    [AttributeType.String]: 'String',
    [AttributeType.Number]: 'Float',
    [AttributeType.Date]: 'DateTime',
    [AttributeType.Boolean]: 'Boolean',
    [AttributeType.Array]: 'Json',
    [AttributeType.Object]: 'Json',
    [AttributeType.Relation]: '',
  }

  private parseRelationshipArg = (fields: string[]) => '[' + fields.join(',') + ']';

  private parseRelation(attribute: Attribute) {
    const relation = attribute.relation;
    if (!relation) return ''

    const fields = relation.fields.length ? `fields: ${this.parseRelationshipArg(relation.fields)}` : '';

    const references = relation.references.length ? `references: ${this.parseRelationshipArg(relation.references)}` : '';

    const action = relation.onDelete ? `onDelete: ${relation.onDelete}` : '';

    const detail = [fields, references, action].filter(Boolean).join(', ');

    return detail ? ` @relation(${detail})` : '';
  };

  private parseRelationType(attribute: Attribute) {
    const {relation} = attribute
    const hasMany = [RelationType.ManyToMany, RelationType.ManyToOne].includes(relation.type);
    return [relation.name, hasMany ? '[]' : ''].join('')
  }

  private parseModelFields(dataModel: DataModel) {
    const id = '  id String @id @map("_id")';

    const attributes = dataModel.attributes
      .filter(attribute => !attribute.primary)
      .map(
        (attribute: Attribute) => {
          const hasMany = [RelationType.ManyToMany, RelationType.ManyToOne].includes(attribute.relation?.type);
          const optional = attribute.rules.required || attribute.primary || hasMany ? '' : '?';
          const defaultValue = attribute.default !== undefined ? ` @default(${attribute.default})` : '';
          const type = attribute.relation ? this.parseRelationType(attribute) : this.dataTypes[attribute.type];
          const relation = this.parseRelation(attribute);
          return `  ${attribute.key} ${type}${optional}${defaultValue}${relation}`;
        }
      );

    const uniques = dataModel.uniques.map(
      (fields: string | string[]) => `  @@unique([${fields}])`
    );

    const modelName = `  @@map("${dataModel.persitentName}")`;
    return [id, ...attributes, ...uniques, modelName].filter(Boolean)
  };  

  private parseModel(dataModel: DataModel): string {
    const model = [`model ${dataModel.key} {`, ...this.parseModelFields(dataModel), "}"].join('\n');
    return model
  }

  private async formatSchema(schemaPath: string) {
    const formatResult = await executeCommand(`npx prisma format --schema=${schemaPath}`);
    if (formatResult.error) throw formatResult.error;
    console.debug(formatResult.result)
  }
  
  private async generate(schemaPath: string) {
    const generateResult = await executeCommand(`npx prisma generate --schema=${schemaPath}`);
    if (generateResult.error) throw generateResult.error;
    console.debug(generateResult.result)
  }

  public async generateClient(dataModels: DataModel[], options?: GenerateOptions) {
    const {dataSource, client, schemaPath = 'prisma/schema.prisma'} = options ?? {};
    const output = client?.output ?? null;
    const provider = dataSource?.provider ?? 'mongodb';
    const url = dataSource?.url ? `"${dataSource.url}"` : 'env("MONGODB_URL")';

    const clientGenerator = [
      'generator client {',
      '  provider = "prisma-client-js"',
      output,
      '}'
    ].filter(Boolean).join('\n');

    const dataSourceDB = [
      'datasource db {',
      `  provider = "${provider}"`,
      `  url      = ${url}`,
      '}'
    ].join('\n');

    const models = dataModels.map(this.parseModel.bind(this));

    const schemaContent = [clientGenerator, dataSourceDB, models].join('\n\n');
    await writeFile(schemaPath, schemaContent);
    await Promise.all([
      await this.formatSchema(schemaPath),
      await this.generate(schemaPath)
    ])
    return schemaContent;
  }
}
