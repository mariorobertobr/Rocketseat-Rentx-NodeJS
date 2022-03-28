# Cadastro de Carros

**Requisitos funcionais**
Deve ser possível cadastrar um novo veiculo
Deve ser possível remover um veiculo
Deve ser possivel listar todas as categorias
Deve ser possível atualizar um veiculo

**Requisitos não funcionais**
Não deve ser possível cadastrar um veiculo com a mesma placa
Não deve ser possível alterar a placa de um veiculo
O carro deve ser cadastro com disponibilidade por padrão
O usuario responsavel pelo cadastro deve ser administrador

# Listagem de Carros

**Requisitos funcionais**
deve ser possivel listar todos carros disponiveis
Deve ser possivel listar todos carros disponiveis pela categorias
deve ser possivel listar todos carros pelo nome do carro
deve ser possivel listar todos carros pela marca

**requisitos não funcionais**
O usuario não precisa estar logado para visualizar os carros

# Cadastro de especificação no carro

**Requisitos funcionais**
Deve ser possivel cadastrar uma espefição no carro
deve ser possivel listar todas as especificações
deve ser possivel listar todos os Carros

**Requisitos não funcionais**
Não deve ser possivel cadastrar uma especificaição para um carro inexistente.
não deve ser possível cadastrar uma especificaição já existente para um mesmo carro.
O usuario responsavel pelo cadastro deve ser administrador

# Cadastro de imagem do carro

**Requisitos funcionais**
deve ser possivel cadastrar a imagem do carro
deve ser possivel listar todos os carros
**Requisitos não funcionais**
utilizar o multer para upload de arquivos

**regras de negocio**
o usuaio deve ser responsavel pelo cadastro de imagem deve ser administrador

# aluguel de carros

**RF**
deve ser posivel cdadastrar um aluguel
**RNF**

**RN**
o aluguel deve ter duração minima de 24 horas
não deve ser possivel cadastrar um novo aluguel caso ha exista um aberto para o mesmo usuario
não deve ser possivel cadastrar um novo aluguel caso ha exista um aberto para o mesmo carro
