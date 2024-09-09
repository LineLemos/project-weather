// Array para armazenar os favoritos
//let favoritos = [];

// Função para exibir os favoritos
//function exibirFavoritos() {
//    const listaFavoritos = document.getElementById('lista-favoritos');
//    listaFavoritos.innerHTML = ''; // Limpa a lista antes de adicionar os itens

//    favoritos.forEach(favorito => {
//        const div = document.createElement('div');
//        div.className = 'favorito-item';
//        div.innerHTML = `
//            <h3>${favorito.nome}</h3>
//            <p>Temperatura: ${favorito.temperatura}</p>
//            <p>Condição: ${favorito.condicao}</p>
//        `;
//        listaFavoritos.appendChild(div);
//    });
//}

// Exemplo de uso com um item da API
//const itemDaAPI = {
//    id: 1,
//    nome: 'Cidade Exemplo',
//    temperatura: '25°C',
//    condicao: 'Ensolarado'
//};

// Adiciona o item aos favoritos quando o botão for clicado
//document.getElementById('botao-favorito').addEventListener('click', () => {
//    adicionarAosFavoritos(itemDaAPI);
//});

// Função para exibir a lista de cidades favoritas
function exibirCidadesFavoritas() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const listaFavoritos = document.getElementById('lista-favoritos');
    listaFavoritos.innerHTML = '';

    favoritos.forEach(cidade => {
        const item = document.createElement('li');
        item.textContent = `${cidade.nome}, ${cidade.pais}`;
        listaFavoritos.appendChild(item);
    });
}

// Lista ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirCidadesFavoritas();
});