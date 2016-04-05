import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App.vue"
import Api from "./api.js"

// load the style
require("normalize.css/normalize.css")
require("./main.less")

// Vue.component("loading", Loading)

Vue.use(VueRouter).use(Api)

let router = new VueRouter({
	linkActiveClass: "active"
})

router.map({
	"/initialize": {
		component: require("./initialize.vue"),
		name: "init"
	},
	"/": {
		component: require("./main.vue"),
		subRoutes: {
			"/dashboard": {
				component: require("./dashboard.vue"),
				name: "dashboard"
			},
			"/network": {
				component: require("./network.vue"),
				name: "network",
			},
			"/network/join": {
				component: require("./network_join.vue"),
				name: "join_network"
			},
			"/network/create": {
				component: require("./network_create.vue"),
				name: "create_network"
			},
			"/network/:nwid": {
				component: require("./network_detail.vue"),
				name: "network_detail"
			},
			"/peers":{
				component: require("./peers.vue"),
				name: "peers"
			},
			"/about": {
				component: {template: "<div>Too lazy to write a help file</div>"},
				name: "about"
			}
		}
	}
})

router.alias({
	"/": "/dashboard"
})

if(process.env.NODE_ENV != "production"){
    window.Router = router
		window.Api = Api
		Vue.config.debug = true
		window.Vue = Vue
}

let config = Api.get_config()
if(config){
	Api.set_config(config.token, config.host)
}
router.start(App, ".app", function(){
	if(!config){
		router.replace("/initialize")
	}
})
