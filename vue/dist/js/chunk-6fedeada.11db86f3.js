(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fedeada"],{a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main-container",staticStyle:{"align-items":"center"}},[s("img",{staticStyle:{width:"300px",margin:"auto","margin-bottom":"100px","margin-top":"50px"},attrs:{src:"https://i.postimg.cc/2j29FCsF/Astrolink-logo-white.png",alt:"a"}}),this.$store.state.auth.status.loggedIn?s("div",[s("h3",[t._v("WELCOME !")])]):s("div",{staticClass:"inner-block",staticStyle:{position:"relative"}},[s("h3",{staticClass:"text-center"},[t._v("Login")]),s("div",{staticStyle:{"font-size":"2em"}},[s("b-icon",{staticStyle:{position:"absolute",top:"15px",right:"15px"},attrs:{id:"help",icon:"question-circle",variant:"dark"}}),s("b-tooltip",{attrs:{target:"help",triggers:"hover",placement:"top"}},[s("strong",{staticStyle:{"font-size":"larger"}},[t._v("Don't have an account yet ?")]),s("br"),t._v(" Ask it to the current Asclepios member in charge of Astrolink administration. ")])],1),s("b-form",{on:{submit:function(e){return e.preventDefault(),t.handleLogin(e)}}},[s("b-form-group",{attrs:{label:"Username","label-for":"username"}},[s("b-form-input",{attrs:{id:"username",type:"text"},model:{value:t.user.username,callback:function(e){t.$set(t.user,"username",e)},expression:"user.username"}})],1),s("b-form-group",{attrs:{label:"Password","label-for":"password"}},[s("b-form-input",{attrs:{id:"password",type:"password"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password",e)},expression:"user.password"}})],1),s("div"),s("b-button",{attrs:{type:"submit",size:"lg",variant:"dark",block:""}},[t.loading?t._e():s("span",[t._v("Log in")]),t.loading?s("b-spinner",{attrs:{type:"grow",variant:"light"}}):t._e()],1)],1)],1),t._m(0)])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer text-center",staticStyle:{position:"absolute",bottom:"0px"}},[t._v(" Astrolink by Asclepios @2021"),s("br"),t._v(" This web app has been developed by Julien Corsin & Valentin Vierge ")])}],r=(s("96cf"),s("1da1")),i=s("5530"),o=s("2f62"),l=s("d4ec"),c=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";Object(l["a"])(this,t),this.username=e,this.first_name=s,this.last_name=a,this.password=n,this.groups=[],this.permissions=[],this.favoriteProcedures=[]},u={data:function(){return{user:new c,loading:!1,message:""}},computed:Object(i["a"])({},Object(o["d"])("auth",["loggedIn"])),methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])("auth",["logout"])),{},{handleLogin:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.user.username&&t.user.password&&(t.loading=!0,t.$store.dispatch("auth/login",t.user).then((function(){t.loading=!1,t.$router.push("/flightplan")})).catch((function(e){t.loading=!1,alert(e.response.data.non_field_errors)})));case 1:case"end":return e.stop()}}),e)})))()}})},p=u,d=(s("d6db"),s("2877")),h=Object(d["a"])(p,a,n,!1,null,null,null);e["default"]=h.exports},d6db:function(t,e,s){"use strict";var a=s("e67a"),n=s.n(a);n.a},e67a:function(t,e,s){}}]);
//# sourceMappingURL=chunk-6fedeada.11db86f3.js.map