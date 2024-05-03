const express = require("express");
const Stripe = require('stripe');
// import Stripe from 'stripe';
const stripe = new Stripe("sk_test_2goAzwq8eehY90v9GfXklsty",{
    'apiVersion':'2022-11-15',
    'typescript':true
})
console.log("2222222dsdsds");
const app = express();


app.use(express.json())

// async function createCustomer() {
//     const customer = await stripe.customers.create({
//         email: 'test@gmail.com',
//         name: 'Test User1',
//       });
// }
// createCustomer();

// async function createPaymentMethod(){
//     const setupIntent = await stripe.paymentMethods.create({
//      type: 'card',
//      card: {
//        number: '6011981111111113',
//        exp_month: 11,
//        exp_year: 2024,
//        cvc: '123',
//      },
//     })
//     console.log('payemnt method Intent object response',setupIntent);
//  }
//  createPaymentMethod();

//  async function attachPaymentMethodWithCustomer(){
//     const setupIntent = await stripe.paymentMethods.attach(
//         'pm_1Ook7eSAkAIYDuQT8VEgQnsK',
//         {
//             customer:'cus_Pe0VPs95X97g92'
//         }
//     )
//     console.log('payemnt method Intent object response',setupIntent);
//  }
//  attachPaymentMethodWithCustomer();

//   async function detachPaymentMethod(){
//         const setupIntent = await stripe.paymentMethods.detach('pm_1Ook7eSAkAIYDuQT8VEgQnsK')
//         console.log('detach payemnt method',setupIntent);
//      }
//      detachPaymentMethod();

// async function confirPaymentIntent(){
//     const setupIntent = await stripe.paymentIntents.confirm(
//         'pi_3OondKSAkAIYDuQT03eNVK8B',
//         {
//             payment_method:"pm_1Ooie2SAkAIYDuQT1i7KO4O8",
//             return_url: 'https://www.example.com',
//         })
//  }
//  confirPaymentIntent();

// async function createPaymentIntent(){
//     const intent = await stripe.paymentIntents.create({
//         "amount": 2100,
//         "currency": "usd",
//         "payment_method": 'pm_1OqYOFC5ClgsKCoPgretZpqp',
//         "on_behalf_of":"acct_1OqVqxFs9YcuDwpq",
//          "transfer_data":{
//          "destination":"acct_1OqVqxFs9YcuDwpq"
//          },
//         "description": "Description of the transaction",
//         "customer": 'cus_PfteQYI5GUhDW9'
//         })
//         console.log('create payment intent client secret',intent.client_secret);
//  }
//  createPaymentIntent();

 async function retreiveAccount(){

    const account = await stripe.accounts.retrieve('acct_1OqVqxFs9YcuDwpq');
    console.log('retreive account121212121',JSON.stringify(account));
 }
 retreiveAccount()

// async function deleteAccount(){

//     const deleted = await stripe.accounts.del('acct_1OqVGHFhBg7N5N4u');
//     console.log('delete account',deleted);
//  }
// deleteAccount()

// async function createCardToken(){

// const token = await stripe.tokens.create({
//   card: {
//     number: '4242424242424242',
//     exp_month: '5',
//     exp_year: '2024',
//     cvc: '314',
//   },
// });
//         console.log('create payment intent client secret',token);
//  }
//  createCardToken();


//   async function listPaymentMethods(){
//     const paymentMethods = await stripe.customers.listPaymentMethods(
//         "cus_Pe0VPs95X97g92",
//         {
//           limit:3
//         }
//         )
//     console.log('payment method list',JSON.stringify(paymentMethods));
//  }
//  listPaymentMethods();


//   async function searchUser(){
//     const search = await stripe.customers.search({
//     query:JSON.stringify({email:'test@gmail.com'})
//     })
//     console.log('search user object',search);
//  }
//  searchUser();






// async function createSetupIntent(){
//    const setupIntent = await stripe.setupIntents.create({
//     payment_method_types:["card"],
//     usage:"on_session",
//     customer:"cus_PdymhgdRm6TpzI"
//    })
//    console.log('setup Intent object response',setupIntent);
// }
// createSetupIntent();

// async function fetchSetupIntent(){
//     const setupIntent = await stripe.setupIntents.retrieve("seti_1OogpwSAkAIYDuQTJSamyrr3")
//     console.log('setup Intent retreive',setupIntent);
//  }
//  fetchSetupIntent();

// async function createToken(){
//     const setupIntent = await stripe.tokens.create({
//         card:{
//             number: '4242424242424242',
//             exp_month: '5',
//             exp_year: '2024',
//             cvc: '314',
//         }

//     })
//     console.log('create tokern object response',setupIntent);
//  }
//  createToken();

app.listen(3000 , ()=>console.log("running!"))