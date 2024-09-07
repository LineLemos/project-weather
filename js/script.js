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

//Realiza a busca das informações da cidade através do click do botão de forma assíncrona
//await faz com que a execução da função assíncrona aguarde a conclusão da chamada antes de continuar.
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
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await resposta.json();

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
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await resposta.json();

        if (data.cod === '404') {
            alert('Localização não encontrada.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.log(error)
        alert('Erro ao buscar dados. Tente novamente.');

    }
}

//Funcao para retornar a previsão de 5 dias baseado no nome
async function getFiveDayForecastByCity(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await resposta.json();

        displayFiveDayForecast(data);
    } catch (error) {
        alert('Erro ao buscar a previsão de 5 dias. Tente novamente.');
    }
}

//Funcao para retornar a previsão de 5 dias baseado nas coordenadas
async function getFiveDayForecast(lat, lon) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await resposta.json();

        displayFiveDayForecast(data);
    } catch (error) {
        alert('Erro ao buscar a previsão de 5 dias. Tente novamente.');
    }
}

//Função para carregar os dados no html
function displayWeather(data) {
    changeColorBasedOnApiResponse(data)
    document.getElementById('cidade').textContent = data.name;
    //document.getElementById('pais').textContent = `Pais: ${data.sys.country}`;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp}°C`;
    document.getElementById('condicao').textContent = `Condição: ${data.weather[0].description}`;
    document.getElementById('umidade').textContent = `Umidade: ${data.main.humidity}%`;
    document.getElementById('tempminima').textContent = `Mínima: ${data.main.temp_min}°C`;
    document.getElementById('tempmaxima').textContent = `Máxima: ${data.main.temp_max}°C`;
    document.getElementById('velvento').textContent = `Velocidade Vento: ${data.wind.speed} meter/sec`;

    // Exibe o ícone do tempo
    const iconeTempo = document.getElementById('icon');
    const iconeCodigo = data.weather[0].icon;
    iconeTempo.src = `http://openweathermap.org/img/wn/${iconeCodigo}@2x.png`;

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
    const containerPrevisao = document.getElementById('previsao-cinco-dias');
    containerPrevisao.innerHTML = '';

    //Criado para buscar previsoes futuras
    const hoje = new Date();
    const diasFuturos = [];
    for (let i = 1; i <= 5; i++) {
        const dataFutura = new Date();
        dataFutura.setDate(hoje.getDate() + i);
        diasFuturos.push(dataFutura.toISOString().split('T')[0]); // Formata a data como YYYY-MM-DD
    }

    // Filtrar previsões para os próximos 5 dias
    const filteredForecast = data.list.filter(item => {
        const dataItem = item.dt_txt.split(' ')[0]; // Extrai a data no formato YYYY-MM-DD
        return diasFuturos.includes(dataItem) && item.dt_txt.includes('12:00:00');
    });

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
        containerPrevisao.appendChild(forecastElement);
    });
}

//function addCidadeFavoritos(data) {
//    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
//    if (!favoritos.find(fav => fav.id === data.id)) {
//        favoritos.push(data);
//        localStorage.setItem('favoritos', JSON.stringfy(favoritos));
//        alert('Cidade não localizada');
//        else {
//        alert('Cidade ja adicionada');
//    }
//}


// mostrar ou ocultar os detalhes
document.getElementById('detalhes-btn').addEventListener('click', () => {
    const containerPrevisao = document.getElementById('previsao-cinco-dias');
    if (containerPrevisao.style.display === 'none') {
        containerPrevisao.style.display = 'flex'; // Exibe os cards
        document.getElementById('detalhes-btn').textContent = 'Ocultar Previsões Futuras';
    } else {
        containerPrevisao.style.display = 'none'; // Oculta os cards
        document.getElementById('detalhes-btn').textContent = 'Ver Previsões Futuras';
    }
});
//Função para fazer a requisição à API
// async function requisiçãoHorario(cidade) {
//     try {
//         const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}=metric&lang=pt_br`);
//         const hour = await resposta.json();
//         return hour;
//     } catch (error) {
//         console.error('Erro ao buscar dados da API:', error);
//     }
// }
// requisiçãoHorario().then(resposta => changeColorBasedOnApiResponse(resposta));

// // Função para mudar a cor do elemento com base na resposta da API
function changeColorBasedOnApiResponse(hour) {
    const element = document.getElementById('background');
    const now = new Date();
    const currentTimeUTC = Math.floor(now.getTime() / 1000); 
    
const sunrise = hour.sys.sunrise; 
    const sunset = hour.sys.sunset;
    console.log(currentTimeUTC >= sunrise && currentTimeUTC < sunset)

    if (currentTimeUTC >= sunrise && currentTimeUTC < sunset) {
        
        element.style.backgroundImage = "linear-gradient(#7dd3fc, #0ea5e9)"; 
         cidade.style.color = '#000';
        element.style.color = "#000";
        cidade.style.color = '#000';

    }else{

        cidade.style.color = '#fff';
        element.style.backgroundImage = "linear-gradient(#113455,#000)"; 
        element.style.color = "#ccc";
        afericoes.style.color= "#000";
        next.style.color = "#ccc";
        // DIAS DA SEMANA .color = "#ccc";

        }    
    }


        