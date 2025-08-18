/* [create-plugin] version: 5.25.7 */
define(["@grafana/ui","@emotion/css","@grafana/runtime","@grafana/data","react"],(e,t,r,n,i)=>(()=>{"use strict";var l={7:t=>{t.exports=e},89:e=>{e.exports=t},531:e=>{e.exports=r},781:e=>{e.exports=n},959:e=>{e.exports=i}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return l[e](r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};o.r(s),o.d(s,{plugin:()=>_});var u=o(781),d=o(959),c=o.n(d),p=o(89),h=o(7),g=o(531);function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class b extends c().Component{getWidth(){if(null==this._value)return 0;const e=null==this._header?0:this._header.getBBox().width,t=this._value.getBBox().width;return e>t?e:t}setWidth(e){this.setState({vbWidth:e})}componentDidMount(){if(null==this._value)return;const e=this._value.getBBox();let t=e.width,r=e.height;if(null!=this._header){const e=this._header.getBBox();e.width>t&&(t=e.width),r+=e.height}this.setState({vbWidth:t,vbHeight:r})}render(){const{vbWidth:e,vbHeight:t}=this.state;let r="";this.props.removeHeader||(r=c().createElement("text",{className:(0,p.cx)(p.css`
                font-weight: normal;
                font-size: 75%;
            `),fill:"white",ref:e=>{this._header=e}},this.props.header));const n=c().createElement("text",{className:(0,p.cx)(p.css`
                font-weight: bold;
            `),fill:"white",ref:e=>{this._value=e}},this.props.value);let i=t/4+2.25;if(null!=this._header){const r=this._header.getBBox();this._header.setAttribute("x",((e-r.width)/2).toString()),this.props.removeHeader||(this._header.setAttribute("y",i.toString()),i+=t/2)}if(null!=this._value){const r=this._value.getBBox();this._value.setAttribute("x",((e-r.width)/2).toString()),this.props.removeHeader?this._value.setAttribute("y",(t/2+2.25).toString()):this._value.setAttribute("y",i.toString())}const l=`0 0 ${e} ${Math.max(t-3,0)}`;return c().createElement("svg",{className:(0,p.cx)(p.css`
            width: 100%;
            box-sizing: border-box;
            padding-left: 0.5em;
            padding-right: 0.5em;
        `),xmlns:"http://www.w3.org/2000/svg",viewBox:l},r,n)}constructor(e){super(e),f(this,"_header",void 0),f(this,"_value",void 0),f(this,"props",void 0),f(this,"state",{vbWidth:0,vbHeight:0}),this.props=e,this._header=null,this._value=null}}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const v={"dark-red":"#C4162A","semi-dark-red":"#E02F44",red:"#F2495C","light-red":"#FF7383","super-light-red":"#FFA6B0","dark-orange":"#FA6400","semi-dark-orange":"#FF780A",orange:"#FF9830","light-orange":"#FFB357","super-light-orange":"#FFCB7D","dark-yellow":"#E0B400","semi-dark-yellow":"#F2CC0C",yellow:"#FADE2A","light-yellow":"#FFEE52","super-light-yellow":"#FFF899","dark-green":"#37872D","semi-dark-green":"#56A64B",green:"#73BF69","light-green":"#96D98D","super-light-green":"#C8F2C2","dark-blue":"#1F60C4","semi-dark-blue":"#3274D9",blue:"#5794F2","light-blue":"#8AB8FF","super-light-blue":"#C0D8FF","dark-purple":"#8F3BB8","semi-dark-purple":"#A352CC",purple:"#B877D9","light-purple":"#CA95E5","super-light-purple":"#DEB6F2"};class y{static fromHex(e){function t(e){return parseInt(e,16)}let r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return null==r?null:new y(t(r[1]),t(r[2]),t(r[3]))}getRGBA(e=1){return`rgba(${this.r}, ${this.g}, ${this.b}, ${e})`}constructor(e,t,r){m(this,"r",void 0),m(this,"g",void 0),m(this,"b",void 0),this.r=e,this.g=t,this.b=r}}function x(e){let t=e;if(void 0===t)return null;if(t.startsWith("rgb")){let e=/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(t);if(null!=e)return new y(parseInt(e[1],10),parseInt(e[2],10),parseInt(e[3],10))}if("#"!==t[0]){let e=v[t];if(null==e)return null;t=e}return y.fromHex(t)}m(y,"BLACK",new y(0,0,0));const F=function(e,t,r){let n={};return e&&(n[t]=r),n};function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){w(e,t,r[t])})}return e}function O(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e}const P=()=>({card:p.css`
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        `,field:p.css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin: 0;
            height: 100%;
            color: white;
            text-decoration: none;
            cursor: default;

            border-radius: 3px;
            background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 5%, rgba(128, 128, 128, 0.1) 50%, rgba(0, 0, 0, 0.3) 110%);

            &[href]:hover {
                cursor: pointer;
            }
        `});function B(e){function t(e,t){var r,n;e.color=null!==(r=x(t.color))&&void 0!==r?r:e.color,e.value=null!==(n=t.text)&&void 0!==n?n:e.value}let r=e.config;var n,i;let l={name:e.name,display:null!==(n=r.displayName)&&void 0!==n?n:"Unknown",color:r.color&&null!==(i=x(r.color.fixedColor))&&void 0!==i?i:y.BLACK,link:null,value:e.values[0]};return void 0===r.mappings||(null!=r.links&&r.links.length>0&&(l.link=r.links[0].url),r.mappings.map(e=>{let r=e.options.result;if("special"===e.type){switch(e.options.match){case"null":null!==l.value&&void 0!==l.value||t(l,r);break;case"nan":Number.isNaN(l.value)&&t(l,r);break;case"null+nan":(null===l.value||void 0===l.value||Number.isNaN(l.value))&&t(l,r);break;case"true":!0===l.value&&t(l,r);break;case"false":!1===l.value&&t(l,r);break;case"empty":""===l.value&&t(l,r)}}if("value"===e.type&&l.value===Object.keys(e.options)[0]&&t(l,e.options[l.value]),"range"===e.type&&("number"==typeof l.value||/^\d+$/.test(l.value))){let n=parseFloat(l.value);if(null!=e.options.from&&n<e.options.from)return;if(null!=e.options.to&&n>e.options.to)return;t(l,r)}})),l}function C(e){let t={};return e.forEach(e=>t[e.name]=e.value),t}const _=new u.PanelPlugin(({options:e,data:t,width:r,height:n,fieldConfig:i,id:l,replaceVariables:a})=>{const o=(0,h.useTheme2)(),s=(0,h.useStyles2)(P);if(e.numFields<=0||0===t.series.length||t.series[0].fields.length<e.numFields)return c().createElement(g.PanelDataErrorView,{fieldConfig:i,panelId:l,data:t});let u=[];for(let e=0;e<t.series[0].fields.length;e++)u[e]=B(t.series[0].fields[e]);let f=[],m=[],v={__data:{value:{fields:C(u)}}};for(let t=0;t<e.numFields;t++){let r=u[t],n=r.link?encodeURI(a(r.link,v)).replace("%EF%BB%BF",""):"";f.push(c().createElement("a",O(k({},F(null!=r.link,"href",n)),{className:(0,p.cx)(s.field,p.css`width: calc((100% / ${e.numFields}) - 0.25em); background-color: ${r.color.getRGBA(e.bgTransparency)};`)}),c().createElement(b,{ref:e=>{m.push(e)},header:r.display,value:r.value,removeHeader:"_"===r.display})))}(0,d.useEffect)(()=>{let e=0;m.map(t=>{if(null==t)return;let r=t.getWidth();r>e&&(e=r)}),m.map(t=>null==t?void 0:t.setWidth(e))});let y="";return y=e.changeSvgColor?"background-color: "+(o.isLight?"rgba(30, 30, 30, 1)":"rgba(255, 255, 255, 1)")+";":`\n            background-image: url(${e.image});\n            background-position: center;\n            background-size: contain;\n            background-repeat: no-repeat;\n        `,c().createElement("div",null,c().createElement("div",{className:(0,p.cx)(p.css`
                position: relative;
                left: 0; top: 0;

                width: ${r}px;
                height: ${n}px;

                ${y}
                mask-image: url(${e.image});
                mask-mode: alpha;
                mask-position: center;
                mask-size: contain;
                mask-repeat: no-repeat;
            `)}),c().createElement("div",{className:(0,p.cx)(s.card,p.css`
                position: relative;
                left: 0; top: -${n}px;

                width: ${r}px;
                height: ${n}px;
            `)},f))}).useFieldConfig({disableStandardOptions:[u.FieldConfigProperty.Thresholds,u.FieldConfigProperty.Filterable,u.FieldConfigProperty.FieldMinMax,u.FieldConfigProperty.Min,u.FieldConfigProperty.Max,u.FieldConfigProperty.Decimals,u.FieldConfigProperty.Unit,u.FieldConfigProperty.Actions,u.FieldConfigProperty.NoValue]}).setPanelOptions(e=>e.addNumberInput({path:"numFields",name:"Počet hodnot ve vizuálu",defaultValue:2}).addSliderInput({path:"bgTransparency",name:"Průhlednost pozadí karty",defaultValue:.8,settings:{min:0,max:1,step:.01}}).addTextInput({path:"image",name:"Obrázek k vizuálu"}).addBooleanSwitch({path:"changeSvgColor",name:"Měnění obrázku podle pozadí"}));return s})());
//# sourceMappingURL=module.js.map