import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsUniqueInterface } from './isUnique.decorator';
import { PrismaService } from '../../database/prisma.service';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { modelName, propertyName }: IsUniqueInterface = args.constraints[0];

    const count = await this.prismaService[modelName].count({
      where: {
        [propertyName]: value,
      },
    });
    return count === 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `Já possui um cadastrado com o campo: ${field}`;
  }
}
