const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
const fs = require('fs')
//const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.S3_BUCKET_NAME;
//const S3_BUCKET_ENDPOINT = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.S3_BUCKET_KEY;
const secretAccessKey = process.env.S3_BUCKET_SECRET;

const s3 = new AWS.S3({

  endpoint: endpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey

})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream