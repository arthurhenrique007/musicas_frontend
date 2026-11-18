
const urlBackend = "http://localhost:3000";

const listaMusicas = document.getElementById("listaMusicas");

async function buscarMusicas() {
    const resposta = await fetch(urlBackend);

    const musicas = await resposta.json();

    listaMusicas.innerHTML = "";

    musicas.forEach((musica) => {
        listaMusicas.innerHTML += `
            <article class="musica">
                <h2>${musica.titulo}</h2>
                <p>${musica.artista}</p>
                <p>${musica.genero} | ${musica.ano} | ${musica.duracao}</p>

                <div class="acoes">
                    <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar" data-id="${musica.id}">Apagar</button>
                </div>
            </article>
        `;
    });
}

listaMusicas.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("apagar")) {
        const id = evento.target.dataset.id;
        apagarMusica(id);
    }
});

async function apagarMusica(id) {
    const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
        method: "DELETE"
    });

    const respostaTransformada = await resposta.json();

    alert(respostaTransformada.mensagem);

    if (resposta.ok) {
        buscarMusicas();
    }
}

buscarMusicas();
