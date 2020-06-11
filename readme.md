# AWS Node Demo #

Projeto com estudos de uso da (aws-sdk) [https://www.npmjs.com/package/aws-sdk]

As credenciais de acesso a AWS devem ser colocadas nas variáveis de ambiente:
- S3_ACCESS_KEY
- S3_ACCESS_SECRET

## AWS S3 ##
O projeto sobe 2 *endpoints*:
- aws-demo/s3-upload - faz upload para um bucket (*query parameter* **bucket**)

- aws-demo/s3-download - faz download de um arquivo (*query parameter* **key**, chave no S3)

O código para upload e download na S3 está no arquivo s3-controler.js