import { IsNotEmpty } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  public readonly content: string;
}
