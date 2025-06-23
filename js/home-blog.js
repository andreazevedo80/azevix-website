document.addEventListener('DOMContentLoaded', function() {
    const homeBlogPostsContainer = document.getElementById('home-blog-posts-container');

    if (!homeBlogPostsContainer) {
        // Se o container não existir (ex: em outras páginas), não faz nada.
        return;
    }

    // Caminho para o JSON de posts, relativo ao index.html
    // O posts.json está em pages/blog/data/posts.json
    fetch('./pages/blog/data/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            if (posts.length === 0) {
                homeBlogPostsContainer.innerHTML = '<p class="text-center text-muted">Nenhum post disponível no momento.</p>';
                return;
            }

            // 1. Ordena os posts pela data mais recente (garantindo que os 3 últimos sejam os mais novos)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // 2. Pega apenas os 3 primeiros (mais recentes) posts
            const latestPosts = posts.slice(0, 3);

            latestPosts.forEach(post => {
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
                homeBlogPostsContainer.innerHTML += postCard;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os posts do blog na home:', error);
            homeBlogPostsContainer.innerHTML = '<p class="text-center text-danger">Erro ao carregar os posts. Tente novamente mais tarde.</p>';
        });
});