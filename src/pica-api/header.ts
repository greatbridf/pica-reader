'use strict';

import * as uuid from 'uuid'
import { HmacSHA256 } from 'crypto-js'

const api_key = 'C69BAF41DA5ABD1FFEDC6D2FEA56B'
const sha_key = '~d}$Q7$eIni=V)9\\RK/P.RM4;9[7|@/CA}b~OW!3?EV`:<>M7pddUBL5n|0/*Cn'

class header {
    create_signature(url: string, time: string, nonce: string, method: 'POST' | 'GET') {
        let tmp = url + time + nonce + method + api_key
        tmp = tmp.toLowerCase()
        return HmacSHA256(tmp, sha_key).toString()
        // return crypto.createHmac('SHA256', sha_key).update(tmp).digest('hex')
    }

    // url: request url without https://picaapi.picacomic.com/
    // method: choose one from methods[] array
    constructor(url: string, method: 'POST' | 'GET') {
        let time = (Date.now() / 1000).toFixed(0)
        let nonce = uuid.v4().replaceAll('-', '')
        this.headers = {
            "api-key": "C69BAF41DA5ABD1FFEDC6D2FEA56B",
            "accept": "application/vnd.picacomic.com.v1+json",
            "app-channel": "1",
            "time": time,
            "nonce": nonce,
            "signature": this.create_signature(url, time, nonce, method),
            "app-version": '2.2.1.3.3.4',
            "app-uuid": "cb69a7aa-b9a8-3320-8cf1-74347e9ee970",
            "image-quality": 'original',
            "app-platform": "android",
            "app-build-version": '45',
            "User-Agent": "okhttp/3.8.1",
            'Content-Type': "application/json; charset=UTF-8",
        }
    }

    set_auth(auth: string) {
        this.headers.authorization = auth
    }

    headers: any
}

export default header
