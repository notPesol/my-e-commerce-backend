import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../dto/response.dto';

export const ApiSwaggerResponse = <T extends Type<any>>(
  model: T,
  type: 'object' | 'array',
) => {
  const data =
    type === 'array'
      ? {
          items: { $ref: getSchemaPath(model) },
        }
      : { $ref: getSchemaPath(model) };

  return applyDecorators(
    ApiExtraModels(ResponseDTO, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDTO) },
          {
            properties: {
              data: {
                ...data,
              },
            },
          },
        ],
      },
    }),
  );
};
