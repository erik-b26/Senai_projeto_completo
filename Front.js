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

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const funcionario = { 
    nome : document.getElementById("nome").value,
    cod_setor : Number(document.getElementById("setor").value),
    salario : Number(document.getElementById("salario").value),
    email : document.getElementById("email").value,
    senha : document.getElementById("senha").value
    };
    try {
        const resp = await fetch("http://localhost:3000/func/",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify(funcionario),
    });
    if(resp.status == 201) {
        msg.textContent = "Funcionário cadastrado com sucesso!";
        msg.style.color = "green";
        form.reset();
    } 
    else {
        msg.textContent = "Erro ao cadastrar funcionário!";
        msg.style.color = "red";
    }
    }catch (err) {
        msg.textContent = "Erro de conexão com o servidor!";
        msg.style.color = "red";
        console.error(err);
    }
    console.log(funcionario);
})