import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueConstraint } from './isUnique.class';

// Decorator options interface
export interface IsUniqueInterface {
  modelName: string;
  propertyName: string;
}

// Decorator function
export function isUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
