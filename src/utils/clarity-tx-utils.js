import {
  ClarityType,
  addressToString
} from '@stacks/transactions'

import {
  SWAPR_STX,
  STACKS_API_URL,
} from '../config.js'

export function wait(ms) {
  return new Promise((accept) => setTimeout(accept, ms))
}

export async function waitForTX(base_url, tx_id, max_wait) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const unwrapped_tx_id = tx_id.substring(1, tx_id.length - 1)
  console.log("waitForTX", unwrapped_tx_id)
  try {
    const wait_time = 500
    let wait_count = Math.round(max_wait / wait_time)
    while (wait_count > 0) {
      const response = await fetch(`${base_url}/sidecar/v1/tx/${unwrapped_tx_id}`, options)

      if (response.ok) {
        const json = await response.json()
        if (json.tx_status === 'success') {
          return json
        } else {
          throw new Error(`transaction ${unwrapped_tx_id} failed: ${json.tx_status}`)
        }
      } else if (response.status === 404) {
        console.log("waiting", wait_count)
        await wait(500)
        wait_count--
      } else {
        throw new Error(`Request failed with ${response.status} ${response.statusText}`)
      }
    }
    throw new Error(`did not return a value after ${max_wait}`)
  } catch (e) {
    throw e
  }
}

export async function getNonce() {
  // console.log("getNonce for", SWAPR_STX)
  const result = await fetch(
    `${STACKS_API_URL}/v2/accounts/${SWAPR_STX}?proof=0`
  )
  const value = await result.json()
  // console.log("value", value)
  return value.nonce
}
