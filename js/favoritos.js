
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
