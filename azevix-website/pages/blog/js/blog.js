document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('blog-posts-container');
    const loadingMessage = document.getElementById('loading-message');

    fetch('./data/posts.json') // Caminho do JSON relativo a blog/index.html
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            loadingMessage.style.display = 'none'; // Esconde a mensagem de carregamento

            if (posts.length === 0) {
                postsContainer.innerHTML = '<p class="text-center text-muted">Nenhum post disponível no momento.</p>';
                return;
            }

            // Ordena os posts pela data mais recente (opcional, se o JSON não estiver em ordem)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            posts.forEach(post => {
                const postCard = `
                    <div class="col-md-6 col-lg-4 mb-4 d-flex">
                        <div class="card blog-card">
                            <img src="${post.imageUrl}" class="card-img-top blog-card-img" alt="${post.title}">
                            <div class="card-body">
                                <h5 class="card-title blog-card-title">${post.title}</h5>
                                <p class="card-text blog-card-summary">${post.summary}</p>
                                <p class="blog-card-meta text-muted">Por ${post.author} em ${new Date(post.date).toLocaleDateString('pt-BR')}</p>
                                <a href="${post.link}" class="btn btn-primary blog-card-button">Leia Mais</a>
                            </div>
                        </div>
                    </div>
                `;
                postsContainer.innerHTML += postCard;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os posts do blog:', error);
            loadingMessage.textContent = 'Erro ao carregar os posts. Tente novamente mais tarde.';
            loadingMessage.classList.add('text-danger');
        });
});