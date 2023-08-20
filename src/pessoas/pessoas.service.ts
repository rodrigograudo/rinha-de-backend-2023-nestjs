import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { CreatePessoaRequestDto } from './dto/create-pessoa-request.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoasRepository: Repository<Pessoa>,
  ) {}

  async create(
    createPessoaRequestDto: CreatePessoaRequestDto,
  ): Promise<Pessoa> {
    try {
      const pessoa = new Pessoa();
      pessoa.apelido = createPessoaRequestDto.apelido;
      pessoa.nome = createPessoaRequestDto.nome;
      pessoa.nascimento = createPessoaRequestDto.nascimento;
      pessoa.stack = createPessoaRequestDto.stack;
      await this.pessoasRepository.insert(pessoa);
      return pessoa;
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityException(
          `Apelido ${createPessoaRequestDto.apelido} já foi inserido`,
        );
      }
    }
  }

  async findById(id: string): Promise<Pessoa> {
    return this.pessoasRepository.findOneBy({ id });
  }

  async search(term: string): Promise<Pessoa[]> {
    const query = this.pessoasRepository
      .createQueryBuilder()
      .where(`MATCH(nome, apelido, stack) AGAINST (:term IN BOOLEAN MODE)`, {
        term: `*${term}*`,
      })
      .limit(50);

    return query.getMany();
  }

  async count(): Promise<number> {
    return this.pessoasRepository.count();
  }
}
