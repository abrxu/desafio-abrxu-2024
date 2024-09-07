class RecintosZoo {
    constructor() {

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: { macaco: 3 } },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { gazela: 1 } },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: { leao: 1 } }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], tipo: 'carnivoro' },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], tipo: 'carnivoro' },
            CROCODILO: { tamanho: 3, biomas: ['rio'], tipo: 'carnivoro' },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], tipo: 'nao-carnivoro' },
            GAZELA: { tamanho: 2, biomas: ['savana'], tipo: 'nao-carnivoro' },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], tipo: 'nao-carnivoro' }
        };
    }

    analisaRecintos(tipoAnimal, quantidade) {

        const animal = this.animais[tipoAnimal];
        let recintosViaveis = [];

        if (!this.animais[tipoAnimal]) {
            return { erro: 'Animal inválido' }
        }
        if (isNaN(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' }
        }

        for (const recinto of this.recintos) {

            const biomaCompativel = animal.biomas.some(bioma => recinto.bioma.includes(bioma))
            if (!biomaCompativel) continue

            const animaisIncompativeis = Object.keys(recinto.animais).some(animalExistente => {
                const tipoAnimalExistente = this.animais[animalExistente.toUpperCase()].tipo
                return (
                    (tipoAnimalExistente === 'carnivoro' && animal.tipo === 'nao-carnivoro') ||
                    (tipoAnimalExistente === 'nao-carnivoro' && animal.tipo === 'carnivoro') ||
                    (tipoAnimalExistente === 'carnivoro' && animal.tipo === 'carnivoro' && animalExistente.toUpperCase() !== tipoAnimal) // true or false
                );
            });
            if (animaisIncompativeis) continue

            let espacoOcupado = Object.keys(recinto.animais).reduce(
                (sum, key) => sum + (recinto.animais[key] * this.animais[key.toUpperCase()].tamanho),
                0
            );

            if (Object.keys(recinto.animais).length > 0 && !recinto.animais[tipoAnimal.toLowerCase()]) {
                espacoOcupado += 1
            }

            let espacoNecessario = quantidade * animal.tamanho

            let espacoLivre = recinto.tamanho - espacoOcupado

            if (espacoLivre >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' }
        }

        return { recintosViaveis: recintosViaveis.sort() }
    }
}

console.log(new RecintosZoo().analisaRecintos('MACACO', 1))

export { RecintosZoo as RecintosZoo };