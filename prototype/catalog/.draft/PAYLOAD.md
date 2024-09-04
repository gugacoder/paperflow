# Estrutura JSON de Requisição

## Descrição Geral

A estrutura JSON de requisição é utilizada para enviar dados e parâmetros ao servidor, que então processa esses dados em um endpoint específico. A estrutura principal é composta por dois formatos de requisição: o uso de um único `payload` ou o uso do `batch`, que permite o envio de múltiplos payloads em uma única requisição.

### Formatos de Requisição

Toda requisição ao catálogo é considerada a execução de uma **ação**. A ação pode ou não requerer um `payload` para ser executada, dependendo do tipo de operação que está sendo realizada.

- **Formato Único:** Este formato é o mais comum e representa a execução de uma única ação no catálogo. A estrutura JSON para essa execução é composta por um único `payload` contendo `form` e `data`, caso necessário. Algumas ações podem ser executadas sem a necessidade de um payload.

- **Formato Batch:** Um formato menos usual, onde múltiplos `payloads` são enviados em um array chamado `batch`. O catálogo executa a ação separadamente para cada `payload` contido no batch.

### Exemplo de Formato Único

```json
{
  "form": {
    "username": "john_doe",
    "action": "update"
  },
  "data": [
    {
      "id": "123",
      "status": "active"
    },
    {
      "id": "456",
      "status": "inactive"
    }
  ]
}
```

### Exemplo de Formato Batch

```json
{
  "batch": [
    {
      "form": {
        "username": "john_doe",
        "action": "update"
      },
      "data": [
        {
          "id": "123",
          "status": "active"
        },
        {
          "id": "456",
          "status": "inactive"
        }
      ]
    },
    {
      "form": {
        "username": "jane_smith",
        "action": "delete"
      },
      "data": [
        {
          "id": "789",
          "status": "deleted"
        }
      ]
    }
  ]
}
```

## Definições Estruturais

Para descrever as estruturas em um nível mais alto, a seguir estão as definições das principais componentes usando uma meta linguagem:

- **Request**
  - **Propriedades:**
    - `batch`: Array de `Payload` (opcional)
    - `payload`: Objeto `Payload` (opcional, usado quando `batch` não está presente)
  
- **Payload**
  - **Propriedades:**
    - `form`: Objeto `Form` (obrigatório)
    - `data`: Array de `DataItem` (obrigatório)

- **Form**
  - **Propriedades:**
    - `key`: `value` (par chave-valor representando parâmetros)

- **DataItem**
  - **Propriedades:**
    - `key`: `value` (par chave-valor representando um objeto de dados)

### Exemplo de Definição

```plaintext
class Request {
  optional List<Payload> batch
  optional Payload payload
}

class Payload {
  required Form form
  required List<DataItem> data
}

class Form {
  required Dictionary<String, String> fields
}

class DataItem {
  required Dictionary<String, String> fields
}
```

## Resumo

A estrutura JSON permite tanto requisições simples, através de um único `payload`, quanto requisições em lote, usando o `batch`. A definição em alto nível das classes e propriedades reflete essa flexibilidade, oferecendo um modelo robusto para a comunicação entre o frontend e o backend.
