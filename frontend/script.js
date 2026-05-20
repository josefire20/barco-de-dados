const api = "http://127.0.0.1:8000";
const frontend = "http://127.0.0.1:5500";

if (window.location.protocol === "file:") {
    window.location.href = frontend;
}

const form = document.getElementById("formUsuario");
const lista = document.getElementById("listaUsuarios");
const totalUsuarios = document.getElementById("totalUsuarios");
const mensagem = document.getElementById("mensagem");
const submitButton = document.getElementById("submitButton");

function mostrarMensagem(texto, tipo = "") {
    mensagem.textContent = texto;
    mensagem.className = tipo ? `message ${tipo}` : "message";
}

function iniciais(nome) {
    return nome
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((parte) => parte.charAt(0))
        .join("") || "?";
}

function criarItemUsuario(usuario) {
    const item = document.createElement("li");
    item.className = "user-card";

    item.innerHTML = `
        <span class="avatar">${iniciais(usuario.nome)}</span>
        <span class="user-info">
            <strong class="user-name">${usuario.nome}</strong>
            <span class="user-email">${usuario.email}</span>
        </span>
        <button class="delete-btn" type="button" data-id="${usuario.id}">Remover</button>
    `;

    return item;
}

async function carregarUsuarios() {
    lista.innerHTML = '<li class="empty-state">Carregando usuarios...</li>';

    try {
        const resposta = await fetch(`${api}/usuarios`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar usuarios");
        }

        const usuarios = await resposta.json();
        totalUsuarios.textContent = usuarios.length;
        lista.innerHTML = "";

        if (usuarios.length === 0) {
            lista.innerHTML = '<li class="empty-state">Nenhum usuario cadastrado ainda.</li>';
            return;
        }

        usuarios.forEach((usuario) => {
            lista.appendChild(criarItemUsuario(usuario));
        });
    } catch (erro) {
        totalUsuarios.textContent = "0";
        lista.innerHTML = '<li class="empty-state">Nao foi possivel carregar os usuarios.</li>';
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

        mostrarMensagem("Usuario removido com sucesso.", "success");
        carregarUsuarios();
    } catch (erro) {
        mostrarMensagem("Nao foi possivel remover o usuario.", "error");
    }
}

lista.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".delete-btn");

    if (!botao) {
        return;
    }

    deletarUsuario(botao.dataset.id);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    submitButton.disabled = true;
    submitButton.textContent = "Cadastrando...";
    mostrarMensagem("");

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

        form.reset();
        mostrarMensagem("Usuario cadastrado com sucesso.", "success");
        carregarUsuarios();
    } catch (erro) {
        mostrarMensagem("Nao foi possivel cadastrar o usuario.", "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Cadastrar usuario";
    }
});

carregarUsuarios();
