// Redirect logic based on token in URL hash
document.addEventListener('DOMContentLoaded', async function() {
  const hash = window.location.hash.substring(1); // Remove #
  
  // Parse hash: #eval/token or #token
  const match = hash.match(/(?:eval\/)?([a-f0-9]+)/);
  const token = match ? match[1] : null;
  
  if (!token) {
    // No token in hash, show input page
    document.body.innerHTML = getInputPageHTML();
    setupInputHandler();
    return;
  }
  
  // Fetch tokens.json to validate token
  try {
    const response = await fetch('/data/tokens.json');
    const tokensData = await response.json();
    
    if (tokensData[token]) {
      // Valid token, redirect to eval page
      window.location.href = `/evals/${token}/`;
    } else {
      // Invalid token, show error
      showError(`Token inválido: "${token}". Verifique o link compartilhado.`);
    }
  } catch (error) {
    console.error('Error loading tokens:', error);
    showError('Erro ao validar token. Tente novamente.');
  }
});

function setupInputHandler() {
  const input = document.getElementById('tokenInput');
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click', function() {
    const token = input.value.trim();
    if (token) {
      window.location.hash = `eval/${token}`;
      location.reload();
    }
  });
  
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });
}

function showError(message) {
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <div style="text-align: center; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 40px; max-width: 400px;">
        <h1 style="color: #856404; margin-top: 0;">⚠️ Erro</h1>
        <p style="color: #856404; font-size: 16px;">${message}</p>
        <button onclick="window.location.href='/';" style="background: #ffc107; border: none; color: #333; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;">Voltar</button>
      </div>
    </div>
  `;
}

function getInputPageHTML() {
  return `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="background: white; border-radius: 12px; padding: 60px 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 500px; text-align: center;">
        <h1 style="color: #333; margin: 0 0 10px 0; font-size: 32px;">📊 Feed Evaluation</h1>
        <p style="color: #666; margin: 0 0 40px 0; font-size: 16px;">Insira seu token de acesso para visualizar suas avaliações</p>
        
        <input 
          type="text" 
          id="tokenInput" 
          placeholder="Cole seu token aqui..."
          style="width: 100%; padding: 15px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; box-sizing: border-box; margin-bottom: 15px; font-family: monospace;"
        >
        
        <button 
          id="submitBtn"
          style="width: 100%; padding: 15px; font-size: 18px; font-weight: bold; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; transition: background 0.3s;"
          onmouseover="this.style.background='#5568d3'"
          onmouseout="this.style.background='#667eea'"
        >
          Acessar →
        </button>
        
        <p style="color: #999; font-size: 12px; margin-top: 20px;">Se você não tem um token, verifique seu e-mail de convite.</p>
      </div>
    </div>
  `;
}
