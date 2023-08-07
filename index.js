const express=require('express')
const Sib=require('sib-api-v3-sdk')
require('dotenv').config()
const client=Sib.ApiClient.instance
const apiKey=client.authentications['api-key']
apiKey.apiKey=process.env.API_KEY

const tranEmailApi= new Sib.TransactionalEmailsApi()

const sender={
    email:'sknayak8338@gmail.com'

}
const recievers=[
    {
        email:'sunset008@gmail.com'
    },
]
tranEmailApi.sendTransacEmail({
    sender,
    to:recievers,
    subject:'test email',
    textContent:`learn coding`
}).then(console.log)
.catch(console.log)