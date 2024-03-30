import { OnApplicationBootstrap } from '@nestjs/common';
import {
  CreateOptions,
  FindOptions,
  Model,
  ModelCtor,
  NonNullFindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';

export abstract class BaseRepoSitory implements OnApplicationBootstrap {
  protected model: ModelCtor<any>;

  protected init() {}

  getModel() {
    return this.model;
  }

  setSchema(schema: string) {
    this.model.schema(schema);
  }

  async findByPk(id: number): Promise<Model | null> {
    return this.model.findByPk(id);
  }

  async findOne(
    options: NonNullFindOptions | FindOptions,
  ): Promise<Model | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions): Promise<Model[]> {
    return this.model.findAll(options);
  }

  async findAndCountAll(
    options?: FindOptions,
  ): Promise<{ rows: Model[]; count: number }> {
    return this.model.findAndCountAll(options);
  }

  async create(data: any, options?: CreateOptions<any>): Promise<Model> {
    return this.model.create(data, { ...options, returning: true });
  }

  async findOrCreate(where: WhereOptions, data: any): Promise<[any, boolean]> {
    return this.model.findOrCreate({
      where,
      defaults: data,
    });
  }

  async updateById(id: number, data: any): Promise<Model | null> {
    const [, models] = await this.model.update(data, {
      where: { id },
      returning: true,
    });
    return models.length > 0 ? models[0] : null;
  }

  async update(options: UpdateOptions, data: any): Promise<Model[]> {
    const [, models] = await this.model.update(data, {
      ...options,
      returning: true,
    });
    return models;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.model.destroy({ where: { id } });
    return result === 1;
  }

  onApplicationBootstrap() {
    this.init();
  }
}
