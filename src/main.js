import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./App.vue"
import Api from "./api.js"


// load the style
require("normalize.css/normalize.css")
require("./main.less")

Vue.use(VueRouter)

let router = new VueRouter({
	linkActiveClass: "active"
})

router.map({
	"/initialize": {
		component: require("./initialize.vue")
	},
})

if(process.env.NODE_ENV != "production"){
    window.Router = router
		window.Api = Api
}

router.start(App, "#app", function(){
    if(localStorage.getItem("zerotier") == null){
        router.replace("/initialize")
    }
})
