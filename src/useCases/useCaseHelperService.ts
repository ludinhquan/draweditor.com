import {isEmpty} from "@draweditor.com/core";
import {Injectable} from "@nestjs/common";

export type Query = {
  include: string
}

@Injectable()
export class UseCaseHeplerService {
  public queryToInclude(query: Query) {
    if (isEmpty(query.include)) return {}

    const relation = query.include.split('],')
      .map(item => this.parseStringToObject(item))
      .reduce((prev, item) => ({...prev, ...item}), {})

    return relation;
  }

  private toJson(keys: string[]) {
    return keys
      .reduce((prev: Record<string, any>, key: string) => ({...prev, [key]: true}), {})
  }

  private parseStringToObject(str: string) {
    const result = str.match(/(.+?)\[/);
    if (!result) {
      const result = str.match(/(.+?)\]/);
      if (!result) return this.toJson([str]);
      return this.toJson(result[1].split(','));
    }

    const keys = result[1]
      .split(',')

    const last = keys.at(-1);

    return {
      ...this.toJson(keys.slice(0, keys.length - 1)),
      [last]: {select: this.parseStringToObject(str.replace(result[0], ''))}
    }
  }
}
