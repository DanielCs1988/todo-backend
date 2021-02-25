import { MinLength } from 'class-validator';

export class TodoDto {
  @MinLength(3)
  public readonly content: string;
}
