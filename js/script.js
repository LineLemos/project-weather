const key = 'ea7427211a3e48c89f4215950240309';
//Carregar a previsao atual para determinada cidade: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=<city>
//http://api.weatherapi.com/v1/current.json?key=ea7427211a3e48c89f4215950240309&q=London
// Substitua 'YOUR_API_KEY' pela sua chave da WeatherAPI.com

document.getElementById('botao-busca').addEventListener('click', () => {
    const cidade = document.getElementById('busca-cidade').value;
    fetchWeather(cidade);
});

async function fetchWeather(cidade) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${cidade}&lang=pt`);
        const data = await response.json();

        if (data.error) {
            alert('Cidade não encontrada!');
            return;
        }
        console.log(data); // Exibe os dados retornados pela API

        document.getElementById('cidade').textContent = data.location.name;
        document.getElementById('estado').textContent = data.location.region;
        document.getElementById('pais').textContent = data.location.country;
        document.getElementById('data').textContent = data.location.localtime;
        document.getElementById('temperatura').textContent = `Temperatura: ${data.current.temp_c}°C`;
        document.getElementById('condicao').textContent = data.current.condition.text;
        document.getElementById('umidade').textContent = data.current.humidity;

        // Adiciona o ícone da condição do tempo
        const iconElement = document.getElementById('icon');
        iconElement.src = data.current.condition.icon;
        iconElement.style.display = 'inline';
        iconElement.alt = data.current.condition.text;
        iconElement.style.width = '200px';
        

    } catch (error) {
        console.error('Erro ao buscar o tempo:', error);
    }
}