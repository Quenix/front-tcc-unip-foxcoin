async function registrar() {
  try {
    // Cria um JSON (JavaScript Object Notation):
    const cliente = {};
    // Atribui ao JSON os valores dos campos recuperados do HTML (DOM):
    cliente.nome = getById('nome').value;
    cliente.email = getById('email').value;
    cliente.documento = getById('documento').value;
    
    
    cliente.senha = getById('senha').value;
    const confirmaSenha = getById('confirmaSenha').value;

    //Verifica se as senhas batem
    if(cliente.senha != confirmaSenha){
      alert("Senhas não batem")
      return
    }

    // Realiza um tratamento especifico para os inputs do tipo 'radio':
    const radioPf = getById('radioPf');
    const radioPj = getById('radioPj');
    cliente.tipo = radioPf.checked ? radioPf.value : radioPj.value;

    // Consome a API (rodando localmente) para a inclusão do Usuário/Cliente
    const response = await fetch('https://calm-bayou-80206.herokuapp.com/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    console.log(response)
    // Verifica a resposta da API - Sucesso (2XX) ou Falha (4XX)):
    if (response.ok) {
      console.log(response)
      alert(`Cliente ${cliente.nome} regitrado com sucesso!`);
      redirecionarSemHistorico('../login/login.html')
    } else {
      await mostrarErro(response);
    }
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro inesperado!');
  }

}