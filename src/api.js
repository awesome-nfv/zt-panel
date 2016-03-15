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
  _auth_header(){
    let header = new Header()
    if(this.token){
      header.append("X-ZT1-Auth", this.token)
    }
    return header
  }
  test_token(token, host){
    return fetch(`${host}/status`, {
      header: this._auth_header(token)
    }).then((res)=>{
      console(res)
    })
  }
  get_config(token, host){
    return JSON.parse(localStorage.getItem("zerotier") || "{}")
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
}
export default new API();
// export let set_token = function(new_token){
//     auth_token = new_token
// }
// export let status = function(){
//     return fetch(`${host}/status`).then(jsonify)
// }
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
