const AWS = require('aws-sdk')
const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const documentClient = new AWS.DynamoDB.DocumentClient()

app.get('/:env/:customer', async (req, res, next) => {
  try { 
    const doc = await documentClient.get({TableName : 'tims_kv',
    Key: {
      Environment: req.params.env,
      Customer: req.params.customer
    }
    }).promise()
  
    if(doc.Item) {
        res.send(doc.Item)
    } else {
        res.status(404).send()
    }

    res.send(doc)
    } catch (err) {
        next(err)
    }
})

app.use(bodyParser.json) 

app.put('/:env/:customer', async (req, res, next) => {
    try {

        console.log(req.body)

      const doc = await documentClient.get({TableName : 'tims_kv',
        Item: {
            ...req.body,
            Environment: req.params.env,
            Customer: req.params.customer
        }
      }).promise()
    
      if(doc.Item) {
          res.send(doc.Item)
      } else {
          res.status(404).send()
      }
  
      res.send(doc)
    } catch (err) {
          next(err)
    }
  })
 
module.exports = app