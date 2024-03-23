import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../dto/response.dto';

export const ApiSwaggerResponse = <T extends Type<any>>(
  model: T,
  type: 'object' | 'array' | 'boolean' | 'number',
) => {
  let data: any = { $ref: getSchemaPath(model) };

  if (type === 'array') {
    data = { items: { $ref: getSchemaPath(model) } };
  } else if (type === 'boolean') {
    data = { type: 'boolean' };
  } else if (type === 'number') {
    data = { type: 'number' };
  }

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
