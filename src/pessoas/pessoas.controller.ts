import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePessoaRequestDto } from './dto/create-pessoa-request.dto';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';

@Controller('pessoas')
export class PessoasController {
  constructor(private pessoasService: PessoasService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createPessoaRequestDto: CreatePessoaRequestDto,
  ): Promise<Response> {
    const pessoa = await this.pessoasService.create(createPessoaRequestDto);
    return res.set({ Location: `/pessoas/${pessoa.id}` }).json(pessoa);
  }

  @Get('contagem-pessoas')
  async count(): Promise<number> {
    return this.pessoasService.count();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Pessoa> {
    const pessoa = await this.pessoasService.findById(id);
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');

    return pessoa;
  }

  @Get()
  async search(@Query('t') term: string): Promise<Pessoa[]> {
    if (!term) throw new BadRequestException('t é obrigatório');

    const pessoas = await this.pessoasService.search(term);
    return pessoas;
  }
}
