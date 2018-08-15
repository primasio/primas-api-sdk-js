!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("bignumber.js")):"function"==typeof define&&define.amd?define(["bignumber.js"],e):"object"==typeof exports?exports.JSONBigNumber=e(require("bignumber.js")):t.JSONBigNumber=e(t.BigNumber)}(this,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(e,n){e.exports=t},function(t,e,n){"use strict";n.r(e),n.d(e,"stringify",function(){return g}),n.d(e,"parse",function(){return N});var r,o,u,i,f,c,a=n(0),s=n.n(a),p=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function l(t){return t<10?"0"+t:t}function y(){return this.valueOf()}function b(t){return p.lastIndex=0,p.test(t)?'"'+t.replace(p,function(t){var e=u[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function g(t,e,n){var u;if(r="",o="","number"==typeof n)for(u=0;u<n;u+=1)o+=" ";else"string"==typeof n&&(o=n);if(i=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return function t(e,n){var u,f,c,a,p,l=r,y=n[e],g=null!=y&&(y instanceof s.a||s.a.isBigNumber(y));switch(g&&!y.isFinite()&&(y=null),y&&"object"==typeof y&&"function"==typeof y.toJSON&&(y=y.toJSON(e)),"function"==typeof i&&(y=i.call(n,e,y)),typeof y){case"string":return g?y:b(y);case"number":return isFinite(y)?String(y):"null";case"boolean":case"null":return String(y);case"object":if(!y)return"null";if(r+=o,p=[],"[object Array]"===Object.prototype.toString.apply(y)){for(a=y.length,u=0;u<a;u+=1)p[u]=t(u,y)||"null";return c=0===p.length?"[]":r?"[\n"+r+p.join(",\n"+r)+"\n"+l+"]":"["+p.join(",")+"]",r=l,c}if(i&&"object"==typeof i)for(a=i.length,u=0;u<a;u+=1)"string"==typeof i[u]&&(c=t(f=i[u],y))&&p.push(b(f)+(r?": ":":")+c);else for(f in y)Object.prototype.hasOwnProperty.call(y,f)&&(c=t(f,y))&&p.push(b(f)+(r?": ":":")+c);return c=0===p.length?"{}":r?"{\n"+r+p.join(",\n"+r)+"\n"+l+"}":"{"+p.join(",")+"}",r=l,c}}("",{"":t})}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+l(this.getUTCMonth()+1)+"-"+l(this.getUTCDate())+"T"+l(this.getUTCHours())+":"+l(this.getUTCMinutes())+":"+l(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=y,Number.prototype.toJSON=y,String.prototype.toJSON=y),u={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};var d,h,j={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},O=function(t){throw{name:"SyntaxError",message:t,at:f,text:d}},m=function(t){return t&&t!==c&&O("Expected '"+t+"' instead of '"+c+"'"),c=d.charAt(f),f+=1,c},S=function(){var t,e="";for("-"===c&&(e="-",m("-"));c>="0"&&c<="9";)e+=c,m();if("."===c)for(e+=".";m()&&c>="0"&&c<="9";)e+=c;if("e"===c||"E"===c)for(e+=c,m(),"-"!==c&&"+"!==c||(e+=c,m());c>="0"&&c<="9";)e+=c,m();if((t=new s.a(e)).isFinite())return t;O("Bad number")},v=function(){var t,e,n,r="";if('"'===c)for(;m();){if('"'===c)return m(),r;if("\\"===c)if(m(),"u"===c){for(n=0,e=0;e<4&&(t=parseInt(m(),16),isFinite(t));e+=1)n=16*n+t;r+=String.fromCharCode(n)}else{if("string"!=typeof j[c])break;r+=j[c]}else r+=c}O("Bad string")},x=function(){for(;c&&c<=" ";)m()};function N(t,e){var n;return d=t,f=0,c=" ",n=h(),x(),c&&O("Syntax error"),"function"==typeof e?function t(n,r){var o,u,i=n[r];if(i&&"object"==typeof i)for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(void 0!==(u=t(i,o))?i[o]=u:delete i[o]);return e.call(n,r,i)}({"":n},""):n}h=function(){switch(x(),c){case"{":return function(){var t,e={};if("{"===c){if(m("{"),x(),"}"===c)return m("}"),e;for(;c;){if(t=v(),x(),m(":"),Object.hasOwnProperty.call(e,t)&&O("Duplicate key '"+t+"'"),e[t]=h(),x(),"}"===c)return m("}"),e;m(","),x()}}O("Bad object")}();case"[":return function(){var t=[];if("["===c){if(m("["),x(),"]"===c)return m("]"),t;for(;c;){if(t.push(h()),x(),"]"===c)return m("]"),t;m(","),x()}}O("Bad array")}();case'"':return v();case"-":return S();default:return c>="0"&&c<="9"?S():function(){switch(c){case"t":return m("t"),m("r"),m("u"),m("e"),!0;case"f":return m("f"),m("a"),m("l"),m("s"),m("e"),!1;case"n":return m("n"),m("u"),m("l"),m("l"),null}O("Unexpected '"+c+"'")}()}},e.default={parse:N,stringify:g}}])});
