// const url = "http://localhost:3000/func";

// async function relFunc() {
//     const resp = await fetch(url);
//     //console.log(resp);
//     if(resp.status === 200) {
//         const obj = await resp.json();
//         console.log(obj);
// }   }

// relFunc();

const form = document.getElementById("formFunc");
const msg = document.getElementById("msg");
const btnMostrar = document.getElementById("btnMostrar");
const btnDeletar = document.getElementById("btnDeletar");
const deleteId = document.getElementById("deleteId");
const listaFunc = document.getElementById("listaFunc");

async function mostrarFuncionarios() {
    try {
        const resp = await fetch("http://localhost:3000/func");
        if (resp.status === 200) {
            const funcs = await resp.json();
            listaFunc.innerHTML = "<h2>Funcionários:</h2>";
            funcs.forEach(func => {
                listaFunc.innerHTML += `<p>Matricula: ${func.matricula}, Nome: ${func.nome}, Setor: ${func.cod_setor}, Salário: ${func.salario}, Email: ${func.email}</p>`;
            });
        } else {
            listaFunc.innerHTML = "<p>Erro ao carregar funcionários.</p>";
        }
    } catch (err) {
        listaFunc.innerHTML = "<p>Erro de conexão com o servidor.</p>";
        console.error(err);
    }
}

btnMostrar.addEventListener("click", mostrarFuncionarios);

async function deletarFuncionario() {
    const id = deleteId.value;
    if (!id) {
        msg.textContent = "Informe o ID do funcionário para deletar.";
        msg.style.color = "red";
        return;
    }
    try {
        const resp = await fetch(`http://localhost:3000/func/${id}`, { method: "DELETE" });
        if (resp.status === 200) {
            msg.textContent = "Funcionário removido com sucesso.";
            msg.style.color = "green";
            deleteId.value = "";
            mostrarFuncionarios();
        } else if (resp.status === 404) {
            msg.textContent = "esse funcionario não existe";
            msg.style.color = "red";
        } else {
            msg.textContent = "Falha ao remover. Verifique o ID.";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.textContent = "Erro de conexão com o servidor ao remover.";
        msg.style.color = "red";
        console.error(err);
    }
}

btnDeletar.addEventListener("click", deletarFuncionario);

async function adicionarFuncionario(funcionario) {
    try {
        const resp = await fetch("http://localhost:3000/func", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionario),
        });

        if (resp.status === 201) {
            msg.textContent = "Funcionário cadastrado com sucesso!";
            msg.style.color = "green";
            form.reset();
            mostrarFuncionarios();
        } else {
            msg.textContent = "Erro ao cadastrar funcionário!";
            msg.style.color = "red";
        }
    } catch (err) {
        msg.textContent = "Erro de conexão com o servidor!";
        msg.style.color = "red";
        console.error(err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const funcionario = { 
    nome : document.getElementById("nome").value,
    cod_setor : Number(document.getElementById("setor").value),
    salario : Number(document.getElementById("salario").value),
    email : document.getElementById("email").value,
    senha : document.getElementById("senha").value
    };
    await adicionarFuncionario(funcionario);
});