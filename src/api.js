/*
    Export the zerotier api
*/

function jsonify(res){
    return res.json()
}

class API {
  constructor(){
    this.token = null
    this.host = "http://127.0.0.1:9993"
  }
  _auth_header(token){
    let header = new Headers()
    if(token){
      header.append("X-ZT1-Auth", token)
    }
    return header
  }
  _default_headers(){
    return {
      headers: this._auth_header(this.token)
    }
  }
  test_token(token, host){
    return fetch(`${host}/status`, {
      headers: this._auth_header(token)
    }).then(jsonify)
  }
  get_config(){
    return JSON.parse(localStorage.getItem("zerotier") || "false")
  }
  set_config(token, host){
    var cfg = {
      token: token,
      host: host
    }
    localStorage.setItem("zerotier", JSON.stringify(cfg))
    this.token = token
    this.host = host
  }
  status(){
    return fetch(`${this.host}/status`, this._default_headers()).then(jsonify)
  }
  controller_status(){
    return fetch(`${this.host}/controller`, this._default_headers()).then(jsonify)
  }
  listNetwork(){
    return fetch(`${this.host}/network`, this._default_headers()).then(jsonify)
  }
  listControllerNetwork(){
    // ignore the network error and just return a empty array
    return fetch(`${this.host}/controller/network`, this._default_headers()).then(jsonify).catch((err)=>{
      // console.log(err)
      return Promise.resolve([])
    })
  }
  listPeers(){
    return fetch(`${this.host}/peer`, this._default_headers()).then(jsonify)
  }
  install(Vue){
    Vue.prototype.$api = this
  }
}

export default new API()

//
// export let list_network = function(){
//     return fetch(`${host}/network`).then(jsonify)
// }
//
// export let network_info = function(nwid){
//     return fetch(`${host}/network/${nwid}`).then(jsonify)
// }
//
// export let join_network = function(nwid){
//     return fetch(`${host}/network/${nwid}`).then(jsonify)
// }
