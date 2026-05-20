const api = "http://127.0.0.1:8000";
const frontend = "http://127.0.0.1:5500";

if (window.location.protocol === "file:") {
    window.location.href = frontend;
}

async function carregarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "<li>Carregando...</li>";

    try {
        const resposta = await fetch(`${api}/usuarios`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar usuarios");
        }

        const usuarios = await resposta.json();
        lista.innerHTML = "";

        usuarios.forEach(usuario => {
            const item = document.createElement("li");

            item.innerHTML = `
                ${usuario.nome} - ${usuario.email}
                <button class="delete-btn" onclick="deletarUsuario(${usuario.id})">
                    Deletar
                </button>
            `;

            lista.appendChild(item);
        });
    } catch (erro) {
        lista.innerHTML = "<li>Nao foi possivel carregar os usuarios.</li>";
    }
}

async function deletarUsuario(id) {
    try {
        const resposta = await fetch(`${api}/usuarios/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar usuario");
        }

        carregarUsuarios();
    } catch (erro) {
        alert("Nao foi possivel deletar o usuario.");
    }
}

document.getElementById("formUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const resposta = await fetch(`${api}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                email,
                senha
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar usuario");
        }

        document.getElementById("formUsuario").reset();

        carregarUsuarios();
    } catch (erro) {
        alert("Nao foi possivel cadastrar o usuario.");
    }
});

carregarUsuarios();
