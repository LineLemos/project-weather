const apiKey = 'cf937c808db51da10b24037b892f5b94'; // API do OpenWeatherMap

//Realiza a busca das coordenadas de geolocalizacao do navegador para retornar
//automaticamente a cidade do usuario e carregar as informações
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await getWeatherByCoordinates(lat, lon);
            await getFiveDayForecast(lat, lon);
        }, () => {
            alert('Não foi possível obter a localização.');
        });
    } else {
        alert('Geolocalização não é suportada por este navegador.');
    }
});

//Realiza a busca das informações da cidade através do click do botão 
document.getElementById('botao-busca').addEventListener('click', async () => {
    const cidade = document.getElementById('busca-cidade').value;
    if (cidade) {
        await getWeatherByCity(cidade);
        await getFiveDayForecastByCity(cidade);
    }
});

//Funcao para retornar os dados da cidade baseado no nome
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

//Funcao para retornar os dados da cidade baseado nas coordenadas
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

//Funcao para retornar a previsão de 5 dias baseado no nome
async function getFiveDayForecastByCity(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();

        displayFiveDayForecast(data);
    } catch (error) {
        alert('Erro ao buscar a previsão de 5 dias. Tente novamente.');
    }
}

//Funcao para retornar a previsão de 5 dias baseado nas coordenadas
async function getFiveDayForecast(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();

        displayFiveDayForecast(data);
    } catch (error) {
        alert('Erro ao buscar a previsão de 5 dias. Tente novamente.');
    }
}

//Função para carregar os dados no html
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
    const codigoPais = data.sys.country.toLowerCase();
    const bandeiraPais = document.getElementById('bandeiraPais');
    bandeiraPais.innerHTML = `<img src="https://flagcdn.com/w20/${codigoPais}.png" alt="Bandeira do país">`;

    // Atualiza a data e o dia da semana
    const atualData = new Date();
    const opcoesData = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const opcoeSemana = { weekday: 'long' };
    const formatacaoData = atualData.toLocaleDateString('pt-BR', opcoesData);
    const formatacaoSemana = atualData.toLocaleDateString('pt-BR', opcoeSemana);
    document.getElementById('data').textContent = `${formatacaoSemana.charAt(0).toUpperCase() + formatacaoSemana.slice(1)} - ${formatacaoData}`;
}

//Função para carregar os dados no html das previsoes de 5 dias
function displayFiveDayForecast(data) {
    const forecastContainer = document.getElementById('previsao-cinco-dias');
    forecastContainer.innerHTML = '';

    // Filtrar as previsões para o meio-dia de cada dia
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    filteredForecast.forEach(forecast => {
        const forecastDate = new Date(forecast.dt_txt);
        const dayOfWeek = forecastDate.toLocaleDateString('pt-BR', { weekday: 'long' });
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;

        // Gerando o card de previsão
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <div class="card">
                <h4>${dayOfWeek}</h4>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                <p>${temp}°C - ${description}</p>
            </div>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}
