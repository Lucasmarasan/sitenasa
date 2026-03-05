document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const birthDateInput = document.getElementById('birth-date');
    const resultCard = document.getElementById('result');
    const mediaContainer = document.getElementById('media-container');
    const title = document.getElementById('title');
    const dateDisplay = document.getElementById('date-display');
    const explanation = document.getElementById('explanation');
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('error-msg');

    // Definir data máxima como hoje
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', today);

    searchBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;
        if (!date) {
            showError('Por favor, selecione uma data.');
            return;
        }

        fetchApod(date);
    });

    async function fetchApod(date) {
        // Reset states
        resultCard.classList.add('hidden');
        errorMsg.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            console.log(`Buscando dados para a data: ${date}`);
            // Chamando o nosso backend em FastAPI
            const response = await fetch(`http://127.0.0.1:8000/apod?date=${date}`);

            console.log('Resposta recebida do servidor:', response.status);

            if (!response.ok) {
                const data = await response.json();
                console.error('Erro retornado pelo backend:', data);
                throw new Error(data.detail || 'Falha ao conectar com o espaço.');
            }

            const data = await response.json();
            displayResult(data);
        } catch (err) {
            showError(err.message);
        } finally {
            loader.classList.add('hidden');
        }
    }

    function displayResult(data) {
        mediaContainer.innerHTML = '';

        if (data.media_type === 'image') {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            mediaContainer.appendChild(img);
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        }

        title.textContent = data.title;
        dateDisplay.textContent = formatDate(data.date);
        explanation.textContent = data.explanation;

        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth' });
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }

    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // Adicionando T12:00:00 para garantir que o fuso horário local não mude o dia
        return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', options);
    }
});
