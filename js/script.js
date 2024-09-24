document.addEventListener('DOMContentLoaded', function () {
    fetch('data/data.json')
        .then(response => response.json())
        .then(dados => {
            carregarInformacoesPessoais(dados);
            carregarLinksSociais(dados.linksSociais);
            carregarHabilidades(dados.linguagens);
            carregarExperiencias(dados.experiencias);
            carregarProjetos(dados.projetos);
        })
        .catch(erro => console.error('Erro ao carregar os dados:', erro));
});

// Função para carregar as informações pessoais
function carregarInformacoesPessoais(dados) {
    document.getElementById('nome').textContent = dados.nome;
    document.getElementById('descricao').textContent = dados.descricao;
}

// Função para carregar os links sociais
function carregarLinksSociais(linksSociais) {
    const container = document.getElementById('links-sociais');
    Object.entries(linksSociais).forEach(([nome, info]) => {
        const link = document.createElement('a');
        link.href = info.url;
        link.target = "_blank";
        link.classList.add('social-link');

        const icon = document.createElement('img');
        icon.src = info.icone;
        icon.alt = nome;
        icon.classList.add('social-icon');

        link.appendChild(icon);
        link.appendChild(document.createTextNode(nome));
        container.appendChild(link);
    });
}

// Função para carregar as habilidades
function carregarHabilidades(linguagens) {
    const container = document.getElementById('lista-linguagens');
    linguagens.forEach(linguagem => {
        const larguraProgresso = calcularProgresso(linguagem.nivel);
        const card = `
            <div class="col-md-4 col-sm-6 mb-3">
                <div class="card">
                    <img src="${linguagem.imagem}" class="card-img-top" alt="${linguagem.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${linguagem.nome}</h5>
                        <p class="text-muted">${linguagem.nivel}</p>
                        <div class="progress">
                            <div class="progress-bar bg-dark progress-bar-striped progress-bar-animated" style="width: ${larguraProgresso};"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}

// Função para calcular a largura da barra de progresso
function calcularProgresso(nivel) {
    switch(nivel) {
        case 'Conhecimento Básico': return '30%';
        case 'Conhecimento Médio': return '60%';
        case 'Conhecimento Avançado': return '90%';
        default: return '0%';
    }
}

// Função para carregar as experiências
function carregarExperiencias(experiencias) {
    const container = document.getElementById('lista-experiencias');
    experiencias.forEach(exp => {
        const card = `
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${exp.titulo} - ${exp.empresa}</h5>
                        <p class="card-text">${exp.descricao}</p>
                        <p class="text-muted">${exp.periodo}</p>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}

// Função para carregar os projetos e seus indicadores
function carregarProjetos(projetos) {
    const listaProjetos = document.getElementById('lista-projetos');
    const indicadores = document.getElementById('carousel-indicators');
    projetos.forEach((projeto, index) => {
        const isActive = index === 0 ? 'active' : '';
        const item = `
            <div class="carousel-item ${isActive}">
                <div class="d-block w-100">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${projeto.nome}</h5>
                            <p class="card-text">${projeto.descricao}</p>
                            <a href="${projeto.link}" target="_blank" class="btn btn-dark">Ver Projeto</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        listaProjetos.insertAdjacentHTML('beforeend', item);

        // Adicionar os indicadores do carrossel
        const indicador = `
            <button type="button" data-bs-target="#projetosCarousel" data-bs-slide-to="${index}" ${isActive ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
        `;
        indicadores.insertAdjacentHTML('beforeend', indicador);
    });
}
