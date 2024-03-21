import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiNormalResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `ResponseOf${model.name}`,
        allOf: [
          {
            items: { $ref: getSchemaPath(model) },
          },
        ],
      },
    }),
  );
};
