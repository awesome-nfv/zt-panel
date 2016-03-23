import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App.vue"
import Api from "./api.js"


// load the style
require("normalize.css/normalize.css")
require("./main.less")

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
			"/peers":{
				component: require("./peers.vue"),
				name: "peers"
			},
			"/about": {
				component: {template: "Too lazy to write a help file"},
				name: "about"
			}
		}
	}
})

if(process.env.NODE_ENV != "production"){
    window.Router = router
		window.Api = Api
		Vue.config.debug = true
}

let config = Api.get_config()
if(config){
	Api.set_config(config.token, config.host)
}
router.start(App, "#app", function(){
	if(!config){
		router.replace("/initialize")
	}
})
