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
    document.getElementById('estado').textContent = data.sys.country; // Não há estado na resposta da API
    document.getElementById('pais').textContent = data.sys.country;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('condicao').textContent = `Condição: ${data.weather[0].description}`;
    document.getElementById('umidade').textContent = `Umidade: ${data.main.humidity}%`;

    // Exibe o ícone do tempo
    const iconElement = document.getElementById('icon');
    const iconCode = data.weather[0].icon;
    iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
