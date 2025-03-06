const fs = require('fs').promises; // Use a versão promissificada
const path = require('path'); // Adicione esta linha

exports.handler = async (event) => {
    const { usuario, senha } = JSON.parse(event.body);

    // Lê o arquivo de usuários de forma assíncrona
    const filePath = path.join(__dirname, '../usuarios.txt'); 
    const data = await fs.readFile(filePath, 'utf8');
    
    const usuarios = data.split('\n');
    let autenticado = false;

    for (let linha of usuarios) {
        const [user, pass] = linha.split('|').map(item => item.trim());
        if (user === usuario.trim() && pass === senha.trim()) {
            autenticado = true;
            break;
        }
    }

    if (autenticado) {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: "Usuário ou senha inválidos!" })
        };
    }
};