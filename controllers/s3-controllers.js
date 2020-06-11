const aws = require('aws-sdk')
const fs = require('fs');
const path = require('path');

// configurando acesso AWS
aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  // endpoint: process.env.S3_ACCESS_ENPOINT,
  // s3ForcePathStyle: true
});

exports.upload = function (req, res) {
  try {
    if(!req.files) {
      res.status(422).send('Nenhum arquivo anexado');
    } else if(!req.query.bucket) {
      res.status(422).send('bucket não especificado');
    } 
    else {
      const bucket = req.query.bucket;

      const file = req.files.arquivo;
        
      file.mv('./data/' + file.name);
      const filePath = './data/' + file.name;

      const params = {
        Bucket: bucket,
        Body : fs.createReadStream(filePath),
        Key : `s3-demo/${Date.now()}-${path.basename(filePath)}`
      };
    
      const s3 = new aws.S3();
      s3.upload(params, function (err, data) {
        if (err) { 
          console.log("Erro: ", err) 
          res.status(500).send(err);
        }
    
        // sucesso
        if (data) { 
          console.log("Uploaded em: ", data.Location);
          res.status(200).send({
            message: 'Arquivo carregado',
            data: {
              key: data.key,
              name: file.name,
              mimetype: file.mimetype,
              size: file.size
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

exports.download = function (req, res) {
  const fileKey = req.query.key;

  const s3 = new aws.S3()
  const options = {
    Bucket: 'giovanibr-bucket',
    Key: fileKey
  }

  const fileStream = s3.getObject(options).createReadStream()

  fileStream.on('error', function (err) {
    console.error(err)
    res.status(404).json(MSG_ANEXO_NOK)
    return res
  })

  res.attachment(fileKey)
  fileStream.pipe(res)
}
