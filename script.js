document.addEventListener('DOMContentLoaded', () => {
    fetch('https://petaniquick.com/wp-json/wp/v2/posts')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts');
            const cardElements = [];

            data.forEach(post => {
                const colElement = document.createElement('div');
                colElement.classList.add('col-md-4', 'mb-4', 'd-flex');

                const cardElement = document.createElement('div');
                cardElement.classList.add('card', 'flex-fill');

                const imgRegex = /<img[^>]+src="([^">]+)"/;
                const imgMatch = post.content.rendered.match(imgRegex);
                const imgSrc = imgMatch ? imgMatch[1] : '';

                if (imgSrc) {
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.classList.add('card-img-top');
                    cardElement.appendChild(imgElement);
                }

                const cardBodyElement = document.createElement('div');
                cardBodyElement.classList.add('card-body', 'd-flex', 'flex-column');

                const titleElement = document.createElement('h5');
                titleElement.classList.add('card-title');
                titleElement.textContent = post.title.rendered;

                const excerptElement = document.createElement('p');
                excerptElement.classList.add('card-text', 'flex-grow-1');
                excerptElement.innerHTML = post.excerpt.rendered;

                const readMoreElement = document.createElement('a');
                readMoreElement.href = post.link;
                readMoreElement.textContent = 'Read More';
                readMoreElement.classList.add('btn', 'btn-primary', 'mt-auto');

                cardBodyElement.appendChild(titleElement);
                cardBodyElement.appendChild(excerptElement);
                cardBodyElement.appendChild(readMoreElement);

                cardElement.appendChild(cardBodyElement);
                colElement.appendChild(cardElement);
                postsContainer.appendChild(colElement);

                cardElements.push(cardElement);
            });

            let maxHeight = 0;
            cardElements.forEach(card => {
                const cardHeight = card.clientHeight;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });

            cardElements.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});
