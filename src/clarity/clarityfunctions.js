
import {
  FungibleConditionCode,
  standardPrincipalCV,
  uintCV,
  makeStandardSTXPostCondition,
  makeStandardFungiblePostCondition,
  PostConditionMode,
  callReadOnlyFunction,
  stringAsciiCV,
  cvToString,
  noneCV,
  createAssetInfo
} from '@stacks/transactions'



import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { openContractCall, openProfileUpdateRequestPopup, openSignatureRequestPopup, openStructuredDataSignatureRequestPopup } from '@stacks/connect';
import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage'

// Transfer
export async function transfer (keys_sender, network, contract_name, contract_address, serverStacks, keys_recipient, amount, commission, rate, typeContract, numberContract, jsonPaymentForm, item, crypto_token, tipoCambioX, montoOrigenX, message64, jsonBlockstackZ50c, uuidX, usernameX) {

    let amountTotal = 0

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }

    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];
    let options = ''
    if (crypto_token.toUpperCase() === 'STX'){
      options = {
        contractAddress: contract_address,
        contractName: contract_name,
        functionName: "transfer",
        network: serverStacksX2,
        postConditionMode: PostConditionMode.Allow,
        postConditions: [
          makeStandardSTXPostCondition(
             keys_sender,
             FungibleConditionCode.Equal,
             amountTotal
          ),
        ],
        functionArgs,
        appDetails: {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
        onFinish: data => {
          jsonPaymentForm.map((todo, i) => {
             if (i === item){
               todo.txid = data.txId
               todo.status = 'pending'
               todo.paid = true
               todo.tipocambio = tipoCambioX
               todo.amountpayment = amount
             }
          })
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          const configGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
          storage.putFile(`${typeContract}_${numberContract}_detail_payment_form.json`, JSON.stringify(jsonPaymentForm), configGaia)
            .then(() => {

              const dateNow = new Date()
              const id = uuidX
              let jsonAttachFile = jsonBlockstackZ50c
              if (jsonAttachFile.length > 0){
                  let jsonBlockstack3 = JSON.stringify(jsonAttachFile)
                  if (jsonBlockstack3.substring(0,1)==='"') {
                     jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                  }
                  if (jsonBlockstack3.substring(0,1)==='[') {
                     jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                  }
                  jsonAttachFile =`${jsonBlockstack3},{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
              }else{
                  jsonAttachFile =`{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
              }
              jsonAttachFile =`[${jsonAttachFile}]`
              jsonAttachFile = JSON.parse(jsonAttachFile)
              storage.putFile(`${typeContract}_${numberContract}_chat3.json`, JSON.stringify(jsonAttachFile), configGaia)
                .then(keyUrl => {
                  window.location = window.location.origin
                })

            })
        },
      };
    }else{
      const fungibleAssetInfo = createAssetInfo(
        keys_recipient,
        crypto_token.toUpperCase()
      );

      options = {
        contractAddress: contract_address,
        contractName: contract_name,
        functionName: "transfer",
        network: serverStacksX2,
        postConditionMode: PostConditionMode.Allow,
        standardFungiblePostCondition: [
          makeStandardFungiblePostCondition(
             keys_sender,
             FungibleConditionCode.LessEqual,
             amountTotal,
             fungibleAssetInfo
          ),
        ],
        functionArgs,
        appDetails: {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
        onFinish: data => {
          jsonPaymentForm.map((todo, i) => {
             if (i === item){
               todo.txid = data.txId
               todo.status = 'pending'
               todo.paid = true
               todo.tipocambio = tipoCambioX
               todo.amountpayment = amount
               todo.fechapago = new Date()
             }
          })
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          const configGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
          storage.putFile(`${typeContract}_${numberContract}_detail_payment_form.json`, JSON.stringify(jsonPaymentForm), configGaia)
            .then(() => {

              const dateNow = new Date()
              const id = uuidX
              let jsonAttachFile = jsonBlockstackZ50c
              if (jsonAttachFile.length > 0){
                  let jsonBlockstack3 = JSON.stringify(jsonAttachFile)
                  if (jsonBlockstack3.substring(0,1)==='"') {
                     jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                  }
                  if (jsonBlockstack3.substring(0,1)==='[') {
                     jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                  }
                  jsonAttachFile =`${jsonBlockstack3},{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
              }else{
                  jsonAttachFile =`{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
              }
              jsonAttachFile =`[${jsonAttachFile}]`
              jsonAttachFile = JSON.parse(jsonAttachFile)
              storage.putFile(`${typeContract}_${numberContract}_chat3.json`, JSON.stringify(jsonAttachFile), configGaia)
                .then(keyUrl => {
                  window.location = window.location.origin
                })

            })
        },
      };
    }
    await openContractCall(options)
}


// Transfer_Register
export async function transferRegister (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract, crypto_token, message64, jsonBlockstackZ50c, uuidX, usernameX) {

    let amountTotal = 0
    let commission = 0
    let rate = 0
    let contract_address = ''
    let contract_name = ''

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          let optionsGaia = { decrypt: false, verify: false }
          let jsonBlockstack4 = []
          storage.getFile(`contractlist.json`, optionsGaia)
             .then((fileContents) => {
               if(fileContents) {
                 const jsonBlockstack1 = fileContents.replace(/\\/g,"")
                 let jsonBlockstack3 = jsonBlockstack1
                 if (jsonBlockstack1.substring(0,1)==='"') {
                    jsonBlockstack3 = jsonBlockstack1.substring(1,jsonBlockstack1.length - 1);
                 }
                 jsonBlockstack4 = JSON.parse(jsonBlockstack3)
                 jsonBlockstack4.map((todo, i) => {
                    if (todo.typeContract === typeContract && todo.configurationContractNumber === numberContract) {
                       todo.confirmSign = true
                       todo.registerTxId = data.txId
                       optionsGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
                       storage.putFile(`contractlist.json`, JSON.stringify(jsonBlockstack4), optionsGaia)
                         .then(() => {
                           let optionsGaia = { decrypt: false, verify: false }
                           let jsonBlockstack4 = []
                           storage.getFile(`${typeContract}_${numberContract}.json`, optionsGaia)
                              .then((fileContents) => {
                                if(fileContents) {
                                  const jsonBlockstack1 = fileContents.replace(/\\/g,"")
                                  let jsonBlockstack3 = jsonBlockstack1
                                  if (jsonBlockstack1.substring(0,1)==='"') {
                                     jsonBlockstack3 = jsonBlockstack1.substring(1,jsonBlockstack1.length - 1);
                                  }
                                  jsonBlockstack4 = JSON.parse(jsonBlockstack3)
                                  const jsonBlockstack = jsonBlockstack4
                                  jsonBlockstack.statusLifeCycle = "Published"
                                  jsonBlockstack.statusBlockchain = "Blockchain"
                                  jsonBlockstack.registerTxId = data.txId

                                  optionsGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
                                  storage.putFile(`${typeContract}_${numberContract}.json`, JSON.stringify(jsonBlockstack), optionsGaia)
                                    .then(() => {

                                      const dateNow = new Date()
                                      const id = uuidX
                                      let jsonAttachFile = jsonBlockstackZ50c
                                      if (jsonAttachFile.length > 0){
                                          let jsonBlockstack3 = JSON.stringify(jsonAttachFile)
                                          if (jsonBlockstack3.substring(0,1)==='"') {
                                             jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                                          }
                                          if (jsonBlockstack3.substring(0,1)==='[') {
                                             jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                                          }
                                          jsonAttachFile =`${jsonBlockstack3},{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
                                      }else{
                                          jsonAttachFile =`{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
                                      }
                                      jsonAttachFile =`[${jsonAttachFile}]`
                                      jsonAttachFile = JSON.parse(jsonAttachFile)
                                      storage.putFile(`${typeContract}_${numberContract}_chat3.json`, JSON.stringify(jsonAttachFile), optionsGaia)
                                        .then(keyUrl => {
                                          window.location = window.location.origin
                                        })

                                    })
                                    .catch(error => {});
                                }
                              })
                             .catch(error => {});
                         })
                         .catch(error => {});
                    }
                 })
               }
             })
            .catch(error => {});
      },
    };
    await openContractCall(options)
}
//-----------------------------------------------------------------------------------------------------------------------------------------

// Transfer_Register
export async function transferCloseDeliverable (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract, crypto_token, message64, jsonBlockstackZ50c, uuidX, usernameX, deliverableUuidX) {

    let amountTotal = 0
    let commission = 0
    let rate = 0
    let contract_address = ''
    let contract_name = ''

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          const jsonBlockstack =`{"deliverableUuid":"${deliverableUuidX}","close":${true},"registerTxId":"${data.txId}"}`
          const optionsGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
          storage.putFile(`${typeContract}_${numberContract}_${deliverableUuidX}_close_deliverable.json`, JSON.stringify(jsonBlockstack), optionsGaia)
            .then(() => {
                const dateNow = new Date()
                const id = uuidX
                let jsonAttachFile = jsonBlockstackZ50c
                if (jsonAttachFile.length > 0){
                    let jsonBlockstack3 = JSON.stringify(jsonAttachFile)
                    if (jsonBlockstack3.substring(0,1)==='"') {
                       jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                    }
                    if (jsonBlockstack3.substring(0,1)==='[') {
                       jsonBlockstack3 = jsonBlockstack3.substring(1,jsonBlockstack3.length - 1);
                    }
                    jsonAttachFile =`${jsonBlockstack3},{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
                }else{
                    jsonAttachFile =`{"id":"${id}","origin":"${usernameX}","date":"${dateNow}","message":"${message64}"}`
                }
                jsonAttachFile =`[${jsonAttachFile}]`
                jsonAttachFile = JSON.parse(jsonAttachFile)
                storage.putFile(`${typeContract}_${numberContract}_chat3.json`, JSON.stringify(jsonAttachFile), optionsGaia)
                  .then(keyUrl => {
                    window.location = window.location.origin
                  })
            })
            .catch(error => {});
      },
    };
    await openContractCall(options)
}

// Transfer_Register
export async function transferCloseShiftReport (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract, crypto_token, message64, jsonBlockstackZ50c, uuidX, usernameX, fechaX, userTurnoDiaX, userTurnoNocheX, jsonData) {

    let amountTotal = 0
    let commission = 0
    let rate = 0
    let contract_address = ''
    let contract_name = ''

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          const dateNow = new Date()
          let jsonDataSha256 = ''
          if (localStorage["sha256"]) {
             jsonDataSha256 = localStorage.getItem('sha256')
          }
          const jsonBlockstack =`{"datetime":"${dateNow}","close":${true},"registerTxId":"${data.txId}","userTurnoDiaX":"${userTurnoDiaX}","userTurnoNocheX":"${userTurnoNocheX}","jsonDataSha256":"${jsonDataSha256}","jsonData":"${jsonData}"}`
          const optionsGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
          storage.putFile(`${typeContract}_${numberContract}_${fechaX}_cierre_turno.json`, JSON.stringify(jsonBlockstack), optionsGaia)
            .then(() => { })
            .catch(error => {});
      },
    };
    await openContractCall(options)
}

//-----------------------------------------------------------------------------------------------------------------------------------------
// Transfer_Register
export async function transferAttribution (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract, crypto_token, message64, jsonBlockstackZ50c, uuidX, usernameX, countryX) {
    let amountTotal = 0
    let commission = 0
    let rate = 0
    let contract_address = ''
    let contract_name = ''

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }
    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
          const userSession = new UserSession()
          const storage = new Storage({ userSession });
          const optionsGaia = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
          let isocode = 'es'
          const optionsDate = {year: "numeric",month: "2-digit",day: "numeric"};
          const newFecha = new Date()
          const newFecha2 =  newFecha.toLocaleString(isocode,optionsDate)
          const jsonBlockstack =`{"country":"${countryX}", "txId":"${data.txId}", "status":"pending", "requisitionDate":"${newFecha2}"}`;
          storage.putFile(`AttributionData.json`, JSON.stringify(jsonBlockstack), optionsGaia)
             .then(() => {
               window.location = window.location.origin
             })
      },
    };

    await openContractCall(options)
}
//-----------------------------------------------------------------------------------------------------------------------------------------
// Transfer_Deliverable
export async function transferDeliverable (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract, crypto_token) {

    let amountTotal = 0
    let commission = 0
    let rate = 0
    let contract_address = ''
    let contract_name = ''

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    if (crypto_token.toUpperCase() === 'STX') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-stx-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MXM') {
        contract_address = "SP13MW8Z069PPZ2F0W21X9390XDZ0PYVDK59KHQVY"
        contract_name = "cc-sip010-mxm-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'XCK') {
        contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
        contract_name = "cc-sip010-xck-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'MIA') {
        contract_address = "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
        contract_name = "miamicoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'NYC') {
        contract_address = "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11"
        contract_name = "newyorkcitycoin-token-v2"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'FRIE') {
        contract_address = "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X"
        contract_name = "friedger-token-v1"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }
    if (crypto_token.toUpperCase() === 'DIKO') {
        contract_address = "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"
        contract_name = "arkadiko-token"
        amountTotal = (parseFloat(amount) + parseFloat(commission) + parseFloat(rate)) * 1000000
    }

    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
      },
    };
    await openContractCall(options)
}

/*
// Transfer_Deliverable
export async function transferDeliverable (keys_sender, serverStacks, keys_recipient, amount, typeContract, numberContract) {

    amount = 0.01

    const amountTotal = parseFloat(amount) * 1000000

    const functionArgs = [
      uintCV(amountTotal),
      standardPrincipalCV(keys_sender),
      standardPrincipalCV(keys_recipient),
      noneCV()
    ];

    let serverStacksX2 = new StacksMainnet()
    if (serverStacks === 'TestNet'){
      serverStacksX2 = new StacksTestnet()
    }

    const contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
    const contract_name = "cc-sip010-stx-v1"

    const options = {
      contractAddress: contract_address,
      contractName: contract_name,
      functionName: "transfer",
      network: serverStacksX2,
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        makeStandardSTXPostCondition(
           keys_sender,
           FungibleConditionCode.Equal,
           amountTotal
        ),
      ],
      functionArgs,
      appDetails: {
        name: "CrossCheck",
        icon: window.location.origin + '/images/isotipo1.png',
      },
      onFinish: data => {
      },
    };
    await openContractCall(options)
}
*/

// Balance
export async function balanceOf(keys_owner, keys_sender, network, contract_name, contract_address, serverStacks, username) {
    const options = {
      method: "GET",
      headers: {},
    }
    const response = await fetch(`${network}/extended/v1/address/${keys_sender}/stx`, options)
    if (response.ok) {
      const result = await response.json()
      return parseFloat(result.balance).toFixed(6) / 1000000
    } else {
      console.log("not 200 response", response)
    }
}


// Balance
export async function balanceOf2(keys_owner, keys_sender, network, contract_name, contract_address, serverStacks, username) {

  let serverStacksX2 = new StacksMainnet()
  if (serverStacks === 'TestNet'){
    serverStacksX2 = new StacksTestnet()
  }
  const functionArgs = [
    standardPrincipalCV(keys_sender),
  ];
  const options = {
    contractAddress: contract_address,
    contractName: contract_name,
    functionName: "balance-of",
    network: serverStacksX2,
    functionArgs,
    senderAddress: keys_sender
  };
  const response = await callReadOnlyFunction(options)
  return parseFloat(cvToString(response.value).substring(1)).toFixed(6) / 1000000
}

// Balance
export async function getBalance(keys_sender, contract_name, contract_address, crypto_decimal, serverStacks) {
  let serverStacksX2 = new StacksMainnet()
  if (serverStacks === 'TestNet'){
    serverStacksX2 = new StacksTestnet()
  }
  const functionArgs = [
    standardPrincipalCV(keys_sender),
  ];
  const options = {
    contractAddress: contract_address,
    contractName: contract_name,
    functionName: "get-balance",
    network: serverStacksX2,
    functionArgs,
    senderAddress: keys_sender
  };
  const response = await callReadOnlyFunction(options)
  return parseFloat(cvToString(response.value).substring(1)).toFixed(6) / crypto_decimal
}

// Read Transaction Detail
export async function getTransaction(network, txid, typeContract, numberContract, jsonPaymentForm, item, modo) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    const response = await fetch(`${network}/extended/v1/tx/${txid}`, options)
    if (response.ok) {
      const result = await response.json()

      console.log(jsonPaymentForm)

      jsonPaymentForm.map((todo, i) => {
         if (i === item){
           if (txid === null || txid === '' ) {
             todo.paid = false
             todo.status = ''
           }else{
             todo.status = result.tx_status

             if (result.tx_status === 'failed' || result.tx_status === 'abort_by_post_condition' || result.tx_status === 'abort_by_response'){
               todo.paid = false
             }else{
               todo.paid = true
             }
           }
         }
      })
      if (modo === 'actualizar'){
        const userSession = new UserSession()
        const storage = new Storage({ userSession });
        const options = {contentType: 'application/json', encrypt: false, dangerouslyIgnoreEtag: true }
        storage.putFile(`${typeContract}_${numberContract}_detail_payment_form.json`, JSON.stringify(jsonPaymentForm), options)
          .then(() => {
          })
      }
      return result

    } else {
      console.log("not 200 response", response)
      const result2 = {tx_id: txid, tx_status: "could not find transaction", tx_type: "", sender_address: "", fee_rate: 0, block_hash: "", burn_block_time_iso: ""}
      return result2
    }
}

// Read Transaction Register Detail
export async function getTransactionRegister(network, txid) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(`${network}/extended/v1/tx/${txid}`, options)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.log("not 200 response", response)
    }
}

// Read Transaction Close Deliverable
export async function getTransactionCloseDeliverable(network, txid) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(`${network}/extended/v1/tx/${txid}`, options)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.log("not 200 response", response)
    }
}


// Read Transaction Deliverable Detail
export async function getTransactionDeliverable(network, txid) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(`${network}/extended/v1/tx/${txid}`, options)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.log("not 200 response", response)
    }
}

export async function service_fee(keys_sender, crypto_token, crypto_decimal) {
    let functionArgs = [stringAsciiCV(crypto_token.toUpperCase())]
    const contract_address = "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8"
    const contract_name = "pg-mdomains-v1-1"
    const options = {
        contractAddress: contract_address,
        contractName: contract_name,
        functionName: "get-domain-service-fee",
        network: new StacksMainnet(),
        functionArgs,
        senderAddress: keys_sender
    };
    const response = await callReadOnlyFunction(options)
    return parseFloat(response.value.words.join()).toFixed(6) / crypto_decimal
}

export async function updateProfile(networkX,storageX,zonefileX,profileNameX,profileWebSiteX,facebookX,twitterX,youtubeX,instagramX,linkedinX,pinterestX,aboutmeX,profileAvatarX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          name: profileNameX,
          description: aboutmeX,
          sameAs: [facebookX,twitterX,youtubeX,instagramX,linkedinX,pinterestX,profileWebSiteX],
          owns: [
            {
              identifier: "bip122:000000000019d6689c085ae165831e93"
            }
          ]
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileName(networkX,storageX,profileNameX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          name: profileNameX
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfilePassword(networkX,storageX,profilePasswordX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          passwordSignature: profilePasswordX
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileAboutMe(networkX,storageX,aboutmeX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          description: aboutmeX
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileWensiteSocialNetwork(networkX,storageX,profileWebSiteX,facebookX,twitterX,youtubeX,instagramX,linkedinX,pinterestX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          sameAs: [facebookX,twitterX,youtubeX,instagramX,linkedinX,pinterestX,profileWebSiteX]
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileEmailTelephone(networkX,storageX,emailX,telephoneX,telephoneCountryX,telephonePrefixX,emailScopeX,telephoneScopeX,applicationScopeX,stxScopeX,btcScopeX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          email: emailX,
          telephone: telephoneX,
          telephoneCountry: telephoneCountryX,
          telephonePrefix: telephonePrefixX,
          potentialAction: [emailScopeX,telephoneScopeX,applicationScopeX,stxScopeX,btcScopeX]
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileStacksNetwork(networkX,storageX,emailScopeX,telephoneScopeX,applicationScopeX,stxScopeX,btcScopeX) {
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          potentialAction: [emailScopeX,telephoneScopeX,applicationScopeX,stxScopeX,btcScopeX]
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function updateProfileVCard(networkX,storageX,modeX,telephoneX,emailX,socialnetworkX,webX,idX,notesX) {
    if (telephoneX === true){telephoneX = 'true'}else{telephoneX = 'false'}
    if (emailX === true){emailX = 'true'}else{emailX = 'false'}
    if (socialnetworkX === true){socialnetworkX = 'true'}else{socialnetworkX = 'false'}
    if (webX === true){webX = 'true'}else{webX = 'false'}
    if (idX === true){idX = 'true'}else{idX = 'false'}
    if (notesX === true){notesX = 'true'}else{notesX = 'false'}
    const backgroundX = storageX+"background"
    const options = {
      profile:
        {
          "@type": "Person",
          "@context": "https://schema.org",
          contactPoint: [modeX,telephoneX,emailX,socialnetworkX,webX,idX,notesX]
        },
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('onFinish')
          console.log(options)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }
    await openProfileUpdateRequestPopup(options);
}

export async function openSignature(networkX,storageX,messageX) {
    const backgroundX = storageX+"background"
    const options = {
      message: messageX,
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('Signature of the message', profile.signature);
          console.log('Use public key:', profile.publicKey);
          updateProfilePassword(networkX,storageX,profile.signature)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)

        },
    }
    await openSignatureRequestPopup(options);
}

export async function openStructuredDataSignature(networkX,storageX,messageX) {
    console.log('openStructuredDataSignature',openStructuredDataSignature)
    console.log('networkX',networkX)
    console.log('storageX',storageX)
    console.log('messageX',messageX)
    const backgroundX = storageX+"background"
    const options = {
      message: messageX,
      network: networkX,
      appDetails:
        {
          name: "CrossCheck",
          icon: window.location.origin + '/images/isotipo1.png',
        },
      onFinish: (profile) =>
        {
          console.log('Signature of the message', profile.signature);
          console.log('Use public key:', profile.publicKey);
          updateProfilePassword(networkX,storageX,profile.signature)
        },
      onCancel: () =>
        {
          console.log('onCancel')
          console.log(options)
        },
    }

    console.log(options)    
    await openStructuredDataSignatureRequestPopup(options);
}
