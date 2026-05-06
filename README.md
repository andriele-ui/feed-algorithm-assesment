# Feed Evaluation - Acesso Privado

Plataforma para compartilhar avaliações de layout de feed com usuários via URLs privadas (GitHub Pages).

## 🚀 Como Funciona

- **Cada usuário recebe um token único** (URL hash-based): `https://seu-site.github.io/feed-evaluation/#eval/{token}`
- **Sem autenticação necessária** — apenas precisa do token para acessar
- **Hostado gratuitamente no GitHub Pages**
- **Totalmente estático** — nenhum servidor backend
- **Segurança por obscuridade** — tokens são opacos e difíceis de adivinhar

## 📁 Estrutura

```
/
├── index.html                    # Página de entrada com redirecionamento
├── assets/
│   ├── redirect.js              # Lógica de validação e redirecionamento
│   └── style.css                # Estilos da aplicação
├── data/
│   └── tokens.json              # Mapeamento de tokens (público)
├── evals/
│   ├── {token1}/
│   │   ├── index.html           # Listagem de versões
│   │   ├── v1.html              # Versão 1 do layout
│   │   ├── v2.html              # Versão 2 do layout
│   │   ├── v3.html              # Versão 3 do layout
│   │   └── v4.html              # Versão 4 do layout (opcional)
│   ├── {token2}/
│   │   └── ...
├── config.json                  # Mapeamento local (NÃO versionado)
└── user_links.csv              # Lista de compartilhamento
```

## 🔧 Arquivos Principais

| Arquivo | Propósito |
|---------|-----------|
| `index.html` | Página raiz que valida token e redireciona |
| `assets/redirect.js` | Lógica de validação de tokens contra `data/tokens.json` |
| `data/tokens.json` | JSON público com mapeamento `{token} → {user_id, username}` |
| `config.json` | Arquivo local com mapeamento completo (backup, não versionado) |

## 🔐 Segurança

- ✅ **URLs com hash não são rastreadas por bots** — `#eval/token` fica no cliente
- ✅ **Tokens opacos** — UUID v4 de 24 caracteres, praticamente impossível adivinhar
- ✅ **GitHub Pages com HTTPS automático** — tráfego criptografado
- ⚠️ **Segurança por obscuridade** — não é cryptografia real, recomendado para dados semi-públicos

## 📤 Como Compartilhar Links

1. Abra `user_links.csv` — contém todos os tokens e URLs
2. Personalize o `base_url` (substitua `GITHUB_USERNAME` pelo seu login GitHub)
3. Compartilhe os links individuais com os usuários:

```
https://seu-usuario.github.io/feed-evaluation/#eval/f33ffd27ec3b4a66a6267674
```

## 🚀 Deployment

### Pré-requisitos
- Conta GitHub
- Git instalado

### Passo 1: Inicializar Repositório Local

```bash
cd /Users/andrielelitenski/Development/Feed_evaluation
git init
git add .
git commit -m "Initial commit: Feed evaluation platform"
```

### Passo 2: Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome: `feed-evaluation`
3. Descrição: "Feed layout evaluation platform"
4. Deixe **public** (necessário para GitHub Pages)
5. Clique "Create repository"

### Passo 3: Fazer Push

```bash
git remote add origin https://github.com/{seu-usuario}/feed-evaluation.git
git branch -M main
git push -u origin main
```

### Passo 4: Ativar GitHub Pages

1. Abra repositório no GitHub
2. Vá para **Settings** → **Pages**
3. Em "Source", selecione **Branch: main** e **Folder: / (root)**
4. Clique "Save"
5. GitHub gera URL: `https://{seu-usuario}.github.io/feed-evaluation/`

### Passo 5: Validar

- Acesse: `https://seu-usuario.github.io/feed-evaluation/` (página de entrada)
- Cole um token válido (ex: de `user_links.csv`)
- Verifique se redireciona para `/evals/{token}/` e mostra versões

## 📋 Checklist de Deployment

- [ ] Repositório Git inicializado e primeira página bem com hash-based redirecting feito
- [ ] Repositório criado no GitHub (público)
- [ ] Push feito com sucesso (`git push`)
- [ ] GitHub Pages ativado em Settings → Pages
- [ ] URL gerada aparece em Settings
- [ ] Acesso à página raiz funciona (`https://...github.io/feed-evaluation/`)
- [ ] Token válido redireciona corretamente
- [ ] Página de versões carrega com links funcionando
- [ ] Links privados compartilhados com usuários

## ❓ Troubleshooting

**"Token inválido"**
- Verifique se o token está correto em `user_links.csv`
- Confirme que `data/tokens.json` foi commitado

**"Página não encontrada (404)"**
- Aguarde 1-2 minutos após ativar GitHub Pages
- Verifique se você está em `https://` (não `http://`)
- Confirme que o repositório é public

**Versões não carregam**
- Verifique se os arquivos HTML estão em `/evals/{token}/`
- Confirme que todos os arquivos foram fazendo push (`git push`)

## 📧 Exemplo de E-mail para Usuários

```
Olá [USERNAME],

Você foi convidado para visualizar sua avaliação de feed layout.

Acesse através do link abaixo:
https://seu-usuario.github.io/feed-evaluation/#eval/[TOKEN]

Você verá 4 versões diferentes de layout. Aproveite!

Obrigado por participar da pesquisa! 🙌
```

## 🛠️ Manutenção

### Adicionar um Novo Usuário
1. Copie a pasta com HTMLs para `/evals/`
2. Gere um token único (UUID v4)
3. Atualize `data/tokens.json` com novo mapeamento
4. Crie `index.html` na pasta com a listagem
5. Faça push: `git add . && git commit && git push`

### Revogar Acesso
1. Remova a pasta `/evals/{token}/` do repositório
2. Remova entrada de `data/tokens.json`
3. Faça push: `git add . && git commit && git push`
4. Link para esse token ficará inativo

## 📞 Suporte

Qualquer dúvida, verifique:
- Arquivo `config.json` (local) para referência de tokens
- Arquivo `user_links.csv` para lista completa de compartilhamento
- Console do navegador (F12) para mensagens de erro em `redirect.js`

---

**Criado em:** 2026-05-06  
**Plataforma:** GitHub Pages (gratuita)  
**Segurança:** Hash-based tokens (semi-privada)
