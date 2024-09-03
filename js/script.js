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

        document.getElementById('cidade').textContent = data.location.name;
        document.getElementById('temperatura').textContent = data.current.temp_c;
        document.getElementById('condicao').textContent = data.current.condition.text;
        document.getElementById('humidade').textContent = data.current.humidity;
    } catch (error) {
        console.error('Erro ao buscar o tempo:', error);
    }
}
