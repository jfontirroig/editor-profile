import axios from 'axios';

export async function fadNaAtLogin() {

  var config = {
    method: 'get',
    url: `https://domains.paradigma.global/fad_na_at/login`,
    headers: {}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    console.log(response)
    respuesta = JSON.stringify(response)
  })
  .catch(function (error) {
    console.log(error);
  });

  return respuesta
}

export async function fadNaAtRequisition(name,username,didweb,stxaddress,mail,phone,language,token) {
  var config = {
    method: 'get',
    url: `https://domains.paradigma.global/fad_na_at/requisition/${name}&&&${username}&&&${didweb}&&&${stxaddress}&&&${mail}&&&${phone}&&&${language}&&&${token}`,
    headers: {}
  };
  let respuesta = ''
  await axios(config)
  .then(function (response) {
    console.log(response)
    respuesta = JSON.stringify(response)
  })
  .catch(function (error) {
    console.log(error);
  });
  return respuesta
}
