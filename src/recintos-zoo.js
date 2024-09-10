import { recintos } from "./recintos";
import { animais } from "./animais";

class RecintosZoo {
  constructor() {
    this.recintos = recintos;
    this.animais = animais;
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal.toUpperCase()]) {
      return { erro: "Animal inválido" };
    }
    
    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: "Quantidade inválida" };
    }
  
    const dadosAnimal = this.animais[animal.toUpperCase()];
    const recintosViaveis = [];
  
    for (const recinto of this.recintos) {
      console.log(`Analisando Recinto ${recinto.numero} (${recinto.bioma})`);
  
      // Verifica se o bioma é compatível
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
  
      // Calcula o espaço usado atualmente no recinto
      let espacoUsado = recinto.animais.reduce(
        (total, a) => total + a.quantidade * a.tamanho,
        0
      );
      console.log(`Espaço usado no Recinto ${recinto.numero}: ${espacoUsado}`);
  
      // Verifica se o recinto já contém animais
      const temOutrosAnimais = recinto.animais.length > 0;
  
      // Verifica regra específica para o macaco (não pode estar sozinho)
      if (animal.toUpperCase() === "MACACO" && !temOutrosAnimais) {
        if (quantidade === 2) {
          console.log(
            `Recinto ${recinto.numero} aceito por estar vazio (2 macacos podem ficar juntos).`
          );
        } else {
          console.log(
            `Recinto ${recinto.numero} descartado por estar vazio (macacos não podem ficar sozinhos).`
          );
          continue;
        }
      }
  
      // Verifica se o recinto contém animais de outras espécies
      const temOutraEspecie = recinto.animais.some(
        (a) => a.especie !== animal.toLowerCase()
      );
      if (temOutraEspecie) {
        espacoUsado += 1; // Espaço extra para coexistência de espécies
        console.log(
          `Espaço extra adicionado no Recinto ${recinto.numero} por coexistência de espécies.`
        );
      }
  
      const espacoRestante = recinto.tamanhoTotal - espacoUsado;
      const espacoNecessario = dadosAnimal.tamanho * quantidade;
      console.log(
        `Espaço restante no Recinto ${recinto.numero}: ${espacoRestante}, espaço necessário: ${espacoNecessario}`
      );
  
      // Verifica regras para carnívoros
      const algumCarnivoro = recinto.animais.some(
        (a) => a.tipo === "carnivoro"
      );
      if (algumCarnivoro && dadosAnimal.tipo !== "carnivoro") {
        console.log(`Recinto ${recinto.numero} descartado por ter carnívoros.`);
        continue; // Carnívoro só pode habitar com a própria espécie
      }
      if (
        dadosAnimal.tipo === "carnivoro" &&
        algumCarnivoro &&
        recinto.animais[0].especie !== animal.toLowerCase()
      ) {
        console.log(
          `Recinto ${recinto.numero} descartado por não ser viável para múltiplos carnívoros.`
        );
        continue; // Carnívoros diferentes
      }
  
      // Verifica se o espaço é suficiente
      if (espacoNecessario <= espacoRestante) {
        console.log(`Recinto ${recinto.numero} é viável.`);
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoRestante - espacoNecessario
          } total: ${recinto.tamanhoTotal})`
        );
      } else {
        console.log(
          `Recinto ${recinto.numero} descartado por espaço insuficiente.`
        );
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
