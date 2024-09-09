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

// // Função para exibir a lista de cidades favoritas
// function exibirCidadesFavoritas() {
//     const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
//     const listaFavoritos = document.getElementById('lista-favoritos');
//     listaFavoritos.innerHTML = '';

//     favoritos.forEach(cidade => {
//         const item = document.createElement('li');
//         item.textContent = `${cidade.nome}, ${cidade.pais}`;
//         listaFavoritos.appendChild(item);
//     });
// }

// // Lista ao carregar a página
// document.addEventListener('DOMContentLoaded', () => {
//     exibirCidadesFavoritas();
// });

// document.getElementById('botao-favorito').addEventListener('click', () => {
//     const cidade = document.getElementById('busca-cidade').value;
//     if (cidade) {
//         getWeatherByCity(cidade).then(data => {
//             if (data) {
//                 addCidadeFavoritos(data);
//                 exibirCidadesFavoritas(); // Atualiza a lista de favoritos após adicionar
//             }
//         });
//     }
// });

// // Função para exibir os favoritos com previsão do dia
// function exibirFavoritos() {
//     const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
//     const container = document.getElementById('lista-favoritos');

//     // Limpa o container antes de adicionar novos elementos
//     container.innerHTML = '';

//     if (favoritos.length === 0) {
//         container.innerHTML = '<p>Nenhuma cidade adicionada aos favoritos.</p>';
//         return;
//     }

//     // Exibe cada cidade favorita com suas informações
//     favoritos.forEach(fav => {
//         const elementoFavorito = document.createElement('div');
//         elementoFavorito.classList.add('favorito-item');
//         elementoFavorito.innerHTML = `
//             <h3>${fav.nome}, ${fav.pais}</h3>
//             <p>Temperatura: ${fav.temperatura}°C</p>
//             <p>Condição: ${fav.condicao}</p>
//             <img src="http://openweathermap.org/img/wn/${fav.icone}@2x.png" alt="${fav.condicao}">
//         `;
//         container.appendChild(elementoFavorito);
//     });
// }

// // Chama a função ao carregar a página
// document.addEventListener('DOMContentLoaded', exibirFavoritos);

// Função para exibir os favoritos com previsão do dia
function exibirFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const container = document.getElementById('lista-favoritos');

    // Limpa o container antes de adicionar novos elementos
    container.innerHTML = '';

    if (favoritos.length === 0) {
        container.innerHTML = '<p>Nenhuma cidade adicionada aos favoritos.</p>';
        return;
    }

    // Exibe cada cidade favorita com suas informações
    favoritos.forEach(fav => {
        const elementoFavorito = document.createElement('div');
        elementoFavorito.classList.add('favorito-item');
        elementoFavorito.innerHTML = `
            <h3>${fav.nome}, ${fav.pais}</h3>
            <p>Temperatura: ${fav.temperatura}°C</p>
            <p>Condição: ${fav.condicao}</p>
            <img src="http://openweathermap.org/img/wn/${fav.icone}@2x.png" alt="${fav.condicao}">
            <button class="btn-excluir" data-id="${fav.id}">
                <i class="ph ph-trash"></i> <!-- Ícone de lixeira -->
            </button>
        `;
        container.appendChild(elementoFavorito);
    });

    // Adiciona um listener para os botões de excluir
    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.closest('button').getAttribute('data-id');
            removerCidadeFavoritos(id);
        });
    });
}

// // Função para remover uma cidade dos favoritos
// function removerCidadeFavoritos(id) {
//     // Verifica se o ID está sendo passado corretamente
//     console.log('Removendo cidade com ID:', id);

//     let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

//     // Verifica se o ID é do tipo string ou número e faz a comparação adequada
//     favoritos = favoritos.filter(fav => fav.id.toString() !== id.toString());

//     // Atualiza o Local Storage com a nova lista de favoritos
//     localStorage.setItem('favoritos', JSON.stringify(favoritos));

//     // Verifica se a cidade foi realmente removida
//     console.log('Cidades restantes:', favoritos);

//     // Atualiza a lista de favoritos na tela
//     exibirFavoritos();
// }

// Função para remover uma cidade dos favoritos
function removerCidadeFavoritos(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Remove a cidade dos favoritos com base no ID
    favoritos = favoritos.filter(fav => fav.id.toString() !== id.toString());

    // Atualiza o Local Storage com a nova lista de favoritos
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    // Atualiza a lista de favoritos na tela
    exibirFavoritos();
}


// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', exibirFavoritos);
