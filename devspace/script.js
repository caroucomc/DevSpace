
const form = document.getElementById("contactForm");
const resultado = document.getElementById("resultado");

// Envio do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        `Obrigado, ${nome}! Sua mensagem foi recebida com sucesso.`;

    form.reset();

    // Limpa também os campos preenchidos pela API
    document.getElementById("rua").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
});

// Consulta de CEP utilizando a API ViaCEP
const campoCep = document.getElementById("cep");

campoCep.addEventListener("blur", consultarCep);

async function consultarCep() {

    const cep = campoCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        if (cep.length > 0) {
            alert("Digite um CEP válido com 8 números.");
        }
        return;
    }

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o CEP.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.getElementById("rua").value = dados.logradouro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;

    } catch (erro) {
        alert("Não foi possível consultar o CEP.");
        console.error(erro);
    }
}
