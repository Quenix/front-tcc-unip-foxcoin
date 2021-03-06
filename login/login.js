async function logar() {
  try {
    const usuario = {};
    usuario.email = getById('email').value;
    usuario.senha = getById('senha').value;

    // Consome a API (rodando localmente) para a inclusão do Usuário/Cliente
    const response = await fetch('https://calm-bayou-80206.herokuapp.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    // Verifica a resposta da API - Sucesso (2XX) ou Falha (4XX)):
    if (response.ok) {
      const usuarioLogado = await response.json();
      
      salvarJsonLocalmente(KEY_USUARIO, usuarioLogado);

      const tokenBasic = gerarTokenBasicAuth(usuario.email, usuario.senha);
      salvarLocalmente(KEY_TOKEN, tokenBasic);

      const ehAdm = usuarioLogado.tipo == 'ADM';
      redirecionarSemHistorico(`../home/home${ehAdm ? '-adm' : ''}.html`);

    } else {
      await mostrarErro(response);
    }
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro inesperado!');
  }
}

async function checkIfUserIsLogged(){
  const usuarioLogado = buscarJsonLocalmente(KEY_USUARIO);

  if(usuarioLogado){
    const ehAdm = usuarioLogado.tipo == 'ADM';
    redirecionarSemHistorico(`../home/home${ehAdm ? '-adm' : ''}.html`);
  }
}
