// Array para armazenar os favoritos
let favoritos = [];

// Função para adicionar um item aos favoritos
//function adicionarAosFavoritos(item) {
    // Verifica se o item já está nos favoritos
//    if (!favoritos.some(favorito => favorito.id === item.id)) {
//        favoritos.push(item);
//        console.log('Item adicionado aos favoritos:', item);
//        exibirFavoritos();
//    } else {
//        console.log('Item já está nos favoritos');
//    }
//}

//Teste de adicão de cidade aos favoritos

// Função para exibir os favoritos
function exibirFavoritos() {
    const listaFavoritos = document.getElementById('lista-favoritos');
    listaFavoritos.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    favoritos.forEach(favorito => {
        const div = document.createElement('div');
        div.className = 'favorito-item';
        div.innerHTML = `
            <h3>${favorito.nome}</h3>
            <p>Temperatura: ${favorito.temperatura}</p>
            <p>Condição: ${favorito.condicao}</p>
        `;
        listaFavoritos.appendChild(div);
    });
}

// Exemplo de uso com um item da API
const itemDaAPI = {
    id: 1,
    nome: 'Cidade Exemplo',
    temperatura: '25°C',
    condicao: 'Ensolarado'
};

// Adiciona o item aos favoritos quando o botão for clicado
document.getElementById('botao-favorito').addEventListener('click', () => {
    adicionarAosFavoritos(itemDaAPI);
});
