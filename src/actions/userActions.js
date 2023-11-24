
import axios from 'axios';

const URL = "https://stacks-node-api.mainnet.stacks.co"

export async function username_new(address) {
  let username = ''
  await axios
    .get(`${URL}/v1/addresses/stacks/${address}`)
    .then(respuesta => {

      const {data} = respuesta
      if (data.names[0] === undefined || data.names[0] === null || data.names[0] === ''){
        username =  address.substring(0,5).toLowerCase()+'...'+address.substring(address.length-5).toLowerCase()+'.xck.app'
      }else{
        username =  data.names[0]
      }
    })
    .catch(err => {
        console.log(err)
    })
  return username
}
