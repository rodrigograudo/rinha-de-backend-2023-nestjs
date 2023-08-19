import { Controller, Get } from '@nestjs/common';
import { PessoasService } from './pessoas/pessoas.service';

@Controller()
export class AppController {
  constructor(private pessoasService: PessoasService) {}

  @Get('contagem-pessoas')
  async count(): Promise<number> {
    return this.pessoasService.count();
  }
}
