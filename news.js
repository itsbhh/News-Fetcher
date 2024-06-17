

async function handleSearch(event) {
    if (event.key === 'Enter') {
        await performSearch();
    }
}


async function performSearch() {
    const searchValue = document.getElementById('search-text').value.trim();

    if (searchValue === '') {
        alert('Please enter a search query.');
        return;
    }

    const apiKey = "52095899b32347a49691263a7ea580f9";
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'success') {
            displayNews(data.results);
        } else {
            console.error('API error:', data);
            alert('Error fetching news data. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching news data. Please try again later.');
    }

    document.getElementById('search-text').value = '';
}

async function displayInitialNews() {
    const apiKey = "52095899b32347a49691263a7ea580f9";
    const initialUrl = `https://newsapi.org/v2/everything?&language=en&apiKey=${apiKey}`;

    try {
        const response = await fetch(initialUrl);
        const data = await response.json();

        if (data.status === 'success') {
            displayNews(data.results.slice(0, 10)); 
        } else {
            console.error('API error:', data);
            alert('Error fetching news data. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching news data. Please try again later.');
    }
}

function displayNews(articles) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        const template = document.getElementById('template-news-card');
        const clone = template.content.cloneNode(true);

        const titleElement = clone.querySelector('.news-title');
        const sourceElement = clone.querySelector('.news-source');
        const descElement = clone.querySelector('.news-desc');
        const imgElement = clone.querySelector('.news-img');

        titleElement.textContent = article.title;
        sourceElement.textContent = article.source_id;
        descElement.textContent = article.description;
        imgElement.src = article.image_url;

        // Add event listener to open the article link in a new tab/window
        clone.querySelector('.card').addEventListener('click', () => {
            window.open(article.link, '_blank');
        });

        cardsContainer.appendChild(clone);
    });
}

document.getElementById('search-text').addEventListener('keypress', handleSearch);
document.getElementById('search-button').addEventListener('click', performSearch);

displayInitialNews();
