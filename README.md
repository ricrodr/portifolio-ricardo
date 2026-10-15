# Portfólio — Ricardo Ramos

Site estático em HTML, CSS e JavaScript, sem dependências de execução ou etapa de build.

## Visualizar

Abra `index.html` no navegador. Para servir via HTTP, execute na raiz:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:4173`. Publique `index.html`, `styles.css`, `script.js` e a pasta `assets/` juntos em qualquer hospedagem estática.

## Editar

- `index.html`: textos, experiência, projetos, contatos e metadados.
- `styles.css`: identidade visual, componentes e layouts responsivos.
- `script.js`: menu móvel, indicação da seção atual, filtros e demonstração de automação.
- `assets/ricardo-ramos.jpg`: foto original, preservada do portfólio anterior.
- `assets/favicon.svg`: marca para a aba do navegador.

Os filtros usam o atributo `data-category` de cada projeto. Os detalhes de cada trabalho são elementos `<details>`, que também funcionam sem JavaScript. Sem scripts, a navegação e todos os projetos continuam visíveis.

A demonstração processa três registros fictícios no próprio navegador. Os visuais dos projetos são representações conceituais; não são capturas de sistemas corporativos nem métricas de clientes.

As fontes são carregadas do Google Fonts com `display=swap` e alternativas locais. As animações respeitam a preferência por movimento reduzido.

## Direção visual

Clareza de conteúdo e hierarquia inspiradas em [Brittany Chiang](https://brittanychiang.com/), e demonstração de habilidades na própria experiência inspirada em [Bruno Simon](https://bruno-simon.com/). Identidade, código e ilustrações em CSS foram criados para este portfólio.
