import fs from 'fs';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import entidadesConfig from '../../config/entidades';

class Html {
  // eslint-disable-next-line class-methods-use-this
  getHtml(_entidade) {
    // eslint-disable-next-line prefer-const
    let html = fs.readFileSync('./src/app/views/default.html', 'utf8')
      .replace(/@cnpjEntidade@/g, entidadesConfig.entidades[0].cnpj)
      .replace(/@enderecoEntidade@/g, entidadesConfig.entidades[0].endereco)
      .replace(/@nomeEntidade@/g, entidadesConfig.entidades[0].sigla)
      .replace(/@linkAssinatura@/g, entidadesConfig.entidades[0].linkAssinatura)
      .replace(/@widthAssinatura@/g, entidadesConfig.entidades[0].widthAssinatura)
      .replace('@telefoneEntidade@', entidadesConfig.entidades[0].telefone)
      .replace('@diaAtual@', format(
        new Date(),
        'dd',
        {
          locale: pt,
        },
      ))
      .replace('@mesAtual@', format(
        new Date(),
        'MMMM ',
        {
          locale: pt,
        },
      ))
      .replace('@anoAtual@', format(
        new Date(),
        'yyyy',
        {
          locale: pt,
        },
      ));

    return html;
  }
}


export default new Html();
