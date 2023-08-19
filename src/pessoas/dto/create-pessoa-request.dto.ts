import { IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreatePessoaRequestDto {
  @IsNotEmpty()
  @MaxLength(32)
  apelido: string;

  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @MaxLength(10)
  nascimento: string;

  @IsOptional()
  @IsArray()
  stack: string[];
}
