(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{144:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},145:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);n(71),n(40),n(73),n(74);var a=n(0),r=n.n(a),o=n(60),c=n.n(o),i=n(155),u=(n(79),n(9)),s=n(10),l=n(13),m=n(11),d=n(12),p=n(151),h=n(153),b=n(21),f=n(69),E=n(154),g=n(7),v=n.n(g),j={apiHost:"https://buffalo-journal.herokuapp.com/",stripeKey:"pk_live_doxQ9etmZ8nozRk89VmvoOrZ"};v.a.defaults.headers.common.Accept="application/json";var O={isAuthenticated:!1,isSubscribed:function(){return null!=O.user.subscription_id},isSetUp:function(){return null!=O.user.subscription_id&&null!=O.user.phone_number},authenticate:function(e,t){v.a.defaults.headers.common.Authorization="Bearer "+e,window.localStorage.setItem("token",e),v.a.get("".concat(j.apiHost,"/auth/google")).then(function(e){O.isAuthenticated=!0,O.user=e.data,t&&t()})},autoLogin:function(e){var t=window.localStorage.getItem("token");t&&O.authenticate(t,e)},signout:function(e){console.log("bye now!"),O.isAuthenticated=!1,O.user=null,window.localStorage.removeItem("token"),e&&e()}},y=O,S=function(e){var t=e.component,n=Object(f.a)(e,["component"]);return r.a.createElement(E.a,Object.assign({},n,{render:function(e){return!0===y.isAuthenticated?r.a.createElement(t,e):r.a.createElement(h.a,{to:{pathname:"/",state:{from:e.location}}})}}))},k=n(152),w=n(148),I=n(149),C=n(150),A=n(61),_=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={redirectToPreviousRoute:!1},n.responseGoogle=function(e){y.authenticate(e.tokenId,function(){n.setState({redirectToPreviousRoute:!0})})},n.failGoogle=function(e){console.log("login failed",e),v.a.defaults.headers.common.Authorization=null},n.componentWillMount=function(){y.autoLogin(function(){n.setState({redirectToPreviousRoute:!0})})},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return this.state.redirectToPreviousRoute?r.a.createElement(h.a,{to:"/"}):r.a.createElement(A.GoogleLogin,{clientId:"300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com",buttonText:"Login",onSuccess:this.responseGoogle,onFailure:this.failGoogle})}}]),t}(a.Component),M=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).logout=function(){y.signout(function(){n.setState({redirect:!0})})},n.renderRedirect=function(){if(n.state.redirect)return r.a.createElement(h.a,{to:"/"})},n.state={redirect:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.renderRedirect(),r.a.createElement(k.a,{onClick:this.logout},"Logout"))}}]),t}(a.Component);var N=function(){return r.a.createElement(w.a,null,r.a.createElement(I.a,null,y.isAuthenticated?r.a.createElement(C.a,{to:"/journal/".concat(y.user.id)},"Journal"):null),r.a.createElement(I.a,null,y.isAuthenticated?r.a.createElement(C.a,{to:"/settings/".concat(y.user.id)},"Settings"):null),r.a.createElement(I.a,null,y.isAuthenticated?r.a.createElement(M,null):null),r.a.createElement(I.a,null,r.a.createElement(_,null)))},x=n(37),R=n.n(x),T=n(66),H=n.n(T);function L(e){return r.a.createElement(w.a,null,r.a.createElement(I.a,{md:2,mdOffset:2},r.a.createElement(R.a,{format:"YYYY/MM/DD"},e.data.date)),r.a.createElement(I.a,{md:8,mdOffset:2},e.data.entry))}var P=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).loadEntries=function(e){v.a.get("".concat(j.apiHost,"/users/").concat(n.props.match.params.userId,"/entries/?page=").concat(e,"&per_page=").concat(20)).then(function(e){var t=n.state.entries,a=e.data;a.map(function(e){t.push(e)});var r=!0;a.length<20&&(r=!1),n.setState({entries:t,hasMore:r})})},n.state={entries:[],hasMore:!0},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=[];return this.state.entries.map(function(t){e.push(r.a.createElement(L,{key:t.id,data:t}))}),r.a.createElement(H.a,{pageStart:0,loadMore:this.loadEntries.bind(this),hasMore:this.state.hasMore,loader:r.a.createElement("div",{className:"loader",key:0},"Loading ...")},e)}}]),t}(a.Component),G=n(39),D=n.n(G),Y=n(67),z=n(23),J=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).submit=n.submit.bind(Object(z.a)(Object(z.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"submit",value:function(){var e=Object(Y.a)(D.a.mark(function e(t){var n,a,r=this;return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.stripe.createToken({name:this.props.userId});case 2:n=e.sent,a=n.token,v.a.post("".concat(j.apiHost,"/users/").concat(this.props.userId,"/subscription"),{card_token:a.id}).then(function(e){console.log("cool"),r.props.cb&&r.props.cb()});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"checkout"},r.a.createElement("p",null,"Subscribe for ",r.a.createElement("strong",null,"$1")," per month, cancel anytime"),r.a.createElement(b.CardElement,null),r.a.createElement("button",{onClick:this.submit},"Subscribe for $1"))}}]),t}(a.Component),K=Object(b.injectStripe)(J),U=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){n.setState({phoneNumber:e.target.value})},n.handleSubmit=function(e){v.a.put("".concat(j.apiHost,"/users/").concat(n.props.match.params.userId,"/"),{phone_number:n.state.phoneNumber}).then(function(e){alert("successfully updated your phone number, congratulations")}),e.preventDefault()},n.handleSubscribe=function(){n.setState({isSubscribed:!0}),y.user.subscription_id="they subbed dont worry about it"},n.state={phoneNumber:"",isSubscribed:y.isSubscribed()},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;v.a.get("".concat(j.apiHost,"/users/").concat(this.props.match.params.userId,"/")).then(function(t){var n=t.data.phone_number;e.setState({phoneNumber:n||""})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w.a,null,r.a.createElement(I.a,null,this.state.isSubscribed?r.a.createElement("form",null,r.a.createElement("label",null,"Phone Number"),r.a.createElement("input",{type:"text",value:this.state.phoneNumber,onChange:this.handleChange,name:"phone_number"}),r.a.createElement("input",{type:"submit",value:"Submit",onClick:this.handleSubmit})):null)),r.a.createElement(w.a,null,r.a.createElement(I.a,null,this.state.isSubscribed?r.a.createElement("p",null,"Thanks for subscribing--if you're trying to cancel you'll need to email me: ",r.a.createElement("a",{href:"mailto:dailyjournalsubscriptions@gmail.com?Subject=Cancellation"},"dailyjournalsubscriptions@gmail.com")):r.a.createElement(b.Elements,null,r.a.createElement(K,{userId:this.props.match.params.userId,cb:this.handleSubscribe})))))}}]),t}(a.Component),B=(n(144),n(145),function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b.StripeProvider,{apiKey:j.stripeKey},r.a.createElement(p.a,null,r.a.createElement(N,null),r.a.createElement(S,{path:"/journal/:userId",component:P}),r.a.createElement(S,{path:"/settings/:userId",component:U}),y.isAuthenticated&&y.isSetUp()?r.a.createElement(h.a,{to:"/journal/".concat(y.user.id)}):y.isAuthenticated&&!y.isSetUp()?r.a.createElement(h.a,{to:"/settings/".concat(y.user.id)}):null)))}}]),t}(a.Component));c.a.render(r.a.createElement(i.a,null,r.a.createElement(B,null)),document.getElementById("root"))},70:function(e,t,n){e.exports=n(147)},79:function(e,t,n){}},[[70,2,1]]]);
//# sourceMappingURL=main.27a02627.chunk.js.map