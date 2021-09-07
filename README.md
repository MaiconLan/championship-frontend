# FacialRecognitionFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Servidor de desenvolvimento

Executar npm install na pasta do pronjeto caso seja a primeira vez que esteja executando.

Executar `ng serve` para subir a aplicação. Acesso local em `http://localhost:4200/`. O aplicativo vai atualizar automaticamente em caso de alteração de arquivo.

## Criar componentes

Executar `ng generate component component-name` para gerar um novo componente. Dá pra usar também `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para buildar o projeto. Os arquivos de build vão ficar na pasta `dist/`. Para subir com as variáveis de ambiente de produção, execute com `--prod`.



## Frontend local apontando pro backend de produção

Execute executar desta forma, execute os comandos abaixo:
* `npm install`
* `ng build --prod`
* `npm start`

Feito isso, pode acessar `http://localhost:4200/` e já estará apontado para produção.

Caso ocorra uma demora para logar, aguarde alguns segundos para o servidor de produção subir, pois, o mesmo fica hibernando quando não utilizado por 30 minutos.

Pode ocorrer do servidor não aceitar o ip localhost:4200, conforme mostra a imagem abaixo, aí teria que alterar a propriedade `facialrecognition.seguranca.origin-permitida` do arquivo application.properties na API.

https://prnt.sc/uudspa
