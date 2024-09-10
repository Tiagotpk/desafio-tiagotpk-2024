import { recintos } from "./recintos";
import { animais } from "./animais";

class RecintosZoo {
  constructor() {
    this.recintos = recintos;
    this.animais = animais;
  }

  analisaRecintos(animal, quantidade) {
    // Verificando se o animal é válido
    if (!this.animais[animal.toUpperCase()]) {
      return { erro: "Animal inválido" };
    }
    // Verificando se a quantidade é válida
    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const dadosAnimal = this.animais[animal.toUpperCase()];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      console.log(`Analisando Recinto ${recinto.numero} (${recinto.bioma})`);

      // Verificação de bioma compatível
      if (
        !dadosAnimal.biomas.includes(recinto.bioma) &&
        !(
          dadosAnimal.especie === "HIPOPOTAMO" &&
          recinto.bioma === "savana e rio"
        )
      ) {
        console.log(
          `Recinto ${recinto.numero} descartado por bioma incompatível.`
        );
        continue;
      }

      // Calculando o espaço atual do recinto
      let espacoUsado = recinto.animais.reduce(
        (total, a) => total + a.quantidade * a.tamanho,
        0
      );
      console.log(`Espaço usado no Recinto ${recinto.numero}: ${espacoUsado}`);

      // Verificando se o recinto contém animais de outras espécies
      const temOutraEspecie = recinto.animais.some(
        (a) => a.especie !== animal.toLowerCase()
      );

      // Espaço extra para coexistência
      if (temOutraEspecie) {
        espacoUsado += 1;
        console.log(
          `Espaço extra adicionado no Recinto ${recinto.numero} por coexistência de espécies.`
        );
      }

      // Calculando o espaço restante
      const espacoRestante = recinto.tamanhoTotal - espacoUsado;
      console.log(
        `Espaço restante no Recinto ${recinto.numero}: ${espacoRestante}`
      );

      // Definindo o espaço necessário
      const espacoNecessario = dadosAnimal.tamanho * quantidade;

      // Verificando se o espaço restante é suficiente para o animal
      if (espacoNecessario <= espacoRestante) {
        const espacoLivreAtualizado = espacoRestante - espacoNecessario;
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoLivreAtualizado} total: ${recinto.tamanhoTotal})`
        );
        console.log(`Recinto ${recinto.numero} aceito para ${animal}.`);
      } else {
        console.log(`Recinto ${recinto.numero} não tem espaço suficiente.`);
      }
    }

    if (recintosViaveis.length > 0) {
      console.log(`Recintos viáveis encontrados: ${recintosViaveis}`);
      return { recintosViaveis };
    } else {
      console.log(`Nenhum recinto viável encontrado.`);
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };
