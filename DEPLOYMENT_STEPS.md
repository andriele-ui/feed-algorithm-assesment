# 🚀 SETUP FINAL - GitHub Pages Deployment

## Próximas Etapas

### ✅ Já Feito (Local)
- Estrutura de pastas criada com 46 usuários mapeados
- Tokens únicos gerados para cada usuário
- HTMLs copiados para `/evals/{token}/`
- Página de redirecionamento funcionando
- Repositório Git inicializado

### ⏭️ Agora: Criar Repositório no GitHub

#### 1️⃣ Criar Repositório

1. Vá para https://github.com/new
2. Preencha:
   - **Repository name:** `feed-evaluation`
   - **Description:** "Feed layout evaluation platform with private token-based access"
   - **Visibility:** **PUBLIC** (necessário para GitHub Pages)
   - Deixe os outros campos padrão
3. Clique **"Create repository"**

#### 2️⃣ Fazer Push do Repositório Local

Copie e cole estes comandos no terminal:

```bash
cd /Users/andrielelitenski/Development/Feed_evaluation

# Adicione o repositório remoto (substitua {seu-usuario} pelo seu login GitHub)
git remote add origin https://github.com/{seu-usuario}/feed-evaluation.git

# Configure a branch main
git branch -M main

# Faça o push
git push -u origin main
```

**Exemplo** (se seu usuário GitHub é "andrielelitenski"):
```bash
git remote add origin https://github.com/andrielelitenski/feed-evaluation.git
git branch -M main
git push -u origin main
```

#### 3️⃣ Ativar GitHub Pages

1. Vá para seu repositório no GitHub: `https://github.com/{seu-usuario}/feed-evaluation`
2. Clique em **Settings** (engrenagem no topo)
3. No menu lateral esquerdo, clique em **Pages**
4. Em "Source", configure:
   - **Branch:** main
   - **Folder:** / (root)
5. Clique **Save**
6. GitHub vai gerar uma URL como: `https://{seu-usuario}.github.io/feed-evaluation/`

#### 4️⃣ Validar Deployment

Aguarde 1-2 minutos, depois:

1. Acesse a URL gerada
2. Você verá a página de entrada (com input para token)
3. Cole um token válido (de `user_links.csv`)
4. Verifique se redireciona e mostra as versões

### 📝 Configurar Links para Compartilhamento

Após o repositório estar no GitHub Pages, abra `user_links.csv` e:

1. Procure pela linha com `base_url =`
2. Substitua `GITHUB_USERNAME` pelo seu login GitHub
3. Os URLs serão regenerados automaticamente

**Exemplo de resultado:**
```
https://andrielelitenski.github.io/feed-evaluation/#eval/f33ffd27ec3b4a66a6267674
```

### ⚠️ Possíveis Erros

| Erro | Solução |
|------|---------|
| "remote origin already exists" | Execute `git remote remove origin` primeiro |
| "403 Permission denied" | Verifique credenciais SSH/HTTPS |
| "Page not found (404)" | Aguarde 2-3 minutos e recarregue |
| "Repository not found" | Verifique se digitou corretamente o nome do repo |

### 📊 Status Atual

```
✅ Estrutura local: PRONTA
✅ Git inicializado: PRONTO
⏳ GitHub repository: AGUARDANDO CRIAÇÃO
⏳ GitHub Pages: AGUARDANDO ATIVAÇÃO
⏳ URLs de compartilhamento: AGUARDANDO FINALIZAÇÃO
```

---

**Próximo Passo:** Avise-me quando tiver feito push para GitHub, e farei as validações finais! 🚀
