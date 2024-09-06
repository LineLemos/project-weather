const apiKey = 'cf937c808db51da10b24037b892f5b94'; // API do OpenWeatherMap

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await getWeatherByCoordinates(lat, lon);
        }, () => {
            alert('Não foi possível obter a localização.');
        });
    } else {
        alert('Geolocalização não é suportada por este navegador.');
    }
});

document.getElementById('botao-busca').addEventListener('click', async () => {
    const cidade = document.getElementById('busca-cidade').value;
    if (cidade) {
        getWeatherByCity(cidade);
    }
});

async function getWeatherByCity(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('Cidade não encontrada.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert('Erro ao buscar dados. Tente novamente.');
    }
}

async function getWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('Localização não encontrada.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert('Erro ao buscar dados. Tente novamente.');
    }
}

function displayWeather(data) {
    document.getElementById('cidade').textContent = data.name;
    document.getElementById('pais').textContent = `Pais: ${data.sys.country}`;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('condicao').textContent = `Condição: ${data.weather[0].description}`;
    document.getElementById('umidade').textContent = `Umidade: ${data.main.humidity}%`;
    document.getElementById('tempminima').textContent = `Mínima: ${data.main.temp_min}°C`;
    document.getElementById('tempmaxima').textContent = `Máxima: ${data.main.temp_max}°C`;
    document.getElementById('velvento').textContent = `Velocidade Vento: ${data.wind.speed} meter/sec`;

    // Exibe o ícone do tempo
    const iconElement = document.getElementById('icon');
    const iconCode = data.weather[0].icon;
    iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Adiciona a bandeira do país
    const codigoPais = data.sys.country.toLowerCase(); // Código do país em minúsculas
    const bandeiraPais = document.getElementById('bandeiraPais');
    bandeiraPais.innerHTML = `<img src="https://flagcdn.com/w20/${codigoPais}.png" alt="Bandeira do país">`;

    // Obtém a data atual e o dia da semana
    const atualData = new Date();
    const opcoesData = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const opcoeSemana = { weekday: 'long' };
    const formatacaoData = atualData.toLocaleDateString('pt-BR', opcoesData);
    const formatacaoSemana = atualData.toLocaleDateString('pt-BR', opcoeSemana);
    // Atualiza a data e o dia da semana
    document.getElementById('data').textContent = `${formatacaoSemana.charAt(0).toUpperCase() + formatacaoSemana.slice(1)} - ${formatacaoData}`;


}
