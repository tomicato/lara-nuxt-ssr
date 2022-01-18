paypal.Buttons({
    createOrder: async function() {
      return await fetch('http://lara-nuxt-ssr/api/paypal/create-paypal-transaction', {
        method: 'GET',
        //mode: 'no-cors',
        headers: {
          'content-type': 'application/json'
        }
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        console.log(data.result.id);
        return data.result.id; // Use the key sent by your server's response, ex. 'id' or 'token'
      });
    },
    onApprove: async function(data) {
      return await fetch('http://lara-nuxt-ssr/api/paypal/capture-paypal-transaction', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          orderID: data.orderID
        })
      }).then(function(res) {
        return res.json();
      }).then(function(details) {
        console.log(details.result.status);
        //alert('Transaction funds captured from ' + details.result.status);
      })
    },
  }).render('#paypal-button-container');

