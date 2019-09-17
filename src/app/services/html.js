import fs from 'fs';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import entidadesConfig from '../../config/entidades';

class Html {
  // eslint-disable-next-line class-methods-use-this
  getHtml(entidadeID) {
    console.log(entidadeID);
    const entidade = entidadesConfig.entidades.find((item) => item.id == entidadeID);
    console.log(entidade);

    // eslint-disable-next-line prefer-const
    let html = fs.readFileSync('./src/app/views/default.html', 'utf8')
      .replace(/@cnpjEntidade@/g, entidade.cnpj)
      .replace(/@enderecoEntidade@/g, entidade.endereco)
      .replace(/@nomeEntidade@/g, entidade.sigla)
      .replace(/@linkAssinatura@/g, entidade.linkAssinatura)
      .replace(/@widthAssinatura@/g, entidade.widthAssinatura)
      .replace('@telefoneEntidade@', entidade.telefone)
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
