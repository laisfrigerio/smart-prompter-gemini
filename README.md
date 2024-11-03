# smart-prompter-gemini

API para gerenciamento de templates de prompts com integração à API gemini do Google!

## Desafio

- [x] Dia 01: Setup básico da aplicação + integração com Gemini
- [x] Dia 02: Salvar prompts e setup do ambiente de testes
- [ ] Dia 03: Criando CRUD de categorias e testes de unidade com mocks
- [ ] Dia 04: Escrevendo testes de integração
- [ ] Dia 05: Categorizando os prompts
- [ ] Dia 06: Filtrando os prompts por categorização e mais testes automatizados
- [ ] Dia 07: Integração contínua com Github Actions

## Rotas

### Criar um template

- POST:

```sh
curl -H 'Content-Type: application/json' http://localhost:3000/templates -d '{"title": "Capital do estado do Paraná", "content": "Qual a capital do estado do Paraná situada na região sul do Brasil?"}'
```

- Exemplo de resposta:

```json
{
  "id": "297c2b12-c47f-43ce-8fad-0864d36fe8f8",
  "title": "Capital do estado do Paraná",
  "content": "Qual a capital do estado do Paraná situada na região sul do Brasil?",,
  "categories": []
}
```

### Lista de templates

- GET:

```sh
curl 'Content-Type: application/json' http://localhost:3000/templates
```

- Exemplo de resposta:

```json
[
  {
    "id": "297c2b12-c47f-43ce-8fad-0864d36fe8f8",
    "title": "Capital do estado do Paraná",
    "content": "Qual a capital do estado do Paraná situada na região sul do Brasil?",,
    "categories": []
  }
]
```

### Encontrar um template por ID

- GET:

```sh
curl 'Content-Type: application/json' http://localhost:3000/templates/7befb756-9dad-48c0-a5a7-3a0c3d20a3fc
```

- Exemplo de resposta:

```json
{
  "id": "297c2b12-c47f-43ce-8fad-0864d36fe8f8",
  "title": "Capital do estado do Paraná",
  "content": "Qual a capital do estado do Paraná situada na região sul do Brasil?",,
  "categories": []
}
```

### Editar um template por ID

- PUT:

```sh
curl -H 'Content-Type: application/json' -X PUT http://localhost:3000/templates/7befb756-9dad-48c0-a5a7-3a0c3d20a3fc -d '{"title": "Capital do estado do Paraná", "content": "Qual a capital do estado do Paraná situada na região sul do Brasil, por favor?"}'
```

- Exemplo de resposta:

```json
{
  "id": "297c2b12-c47f-43ce-8fad-0864d36fe8f8",
  "title": "Capital do estado do Paraná",
  "content": "Qual a capital do estado do Paraná situada na região sul do Brasil?",,
  "categories": []
}
```

### Remover um template por ID

- DELETE:

```sh
curl -H 'Content-Type: application/json' -X DELETE http://localhost:3000/templates/7befb756-9dad-48c0-a5a7-3a0c3d20a3fc
```
