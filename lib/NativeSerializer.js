Object.defineProperty(exports,"__esModule",{value:true});var allowedMapObjectTypes=['string','number','boolean'];





var serializeForNativeLayer=function serializeForNativeLayer(map){var maxDepth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:10;var depth=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var seen=arguments.length>3&&arguments[3]!==undefined?arguments[3]:new Set();
seen.add(map);
var output={};
for(var key in map){
if(!{}.hasOwnProperty.call(map,key))continue;

var value=map[key];


if([undefined,null].includes(value)||typeof value==='number'&&isNaN(value)){
output[key]={type:'string',value:String(value)};
}else if(typeof value==='object'){
if(seen.has(value)){
output[key]={type:'string',value:'[circular]'};
}else if(depth===maxDepth){
output[key]={type:'string',value:'[max depth exceeded]'};
}else{
output[key]={type:'map',value:serializeForNativeLayer(value,maxDepth,depth+1,seen)};
}
}else{
var type=typeof value;
if(allowedMapObjectTypes.includes(type)){
output[key]={type:type,value:value};
}else{
console.warn('Could not serialize breadcrumb data for \''+key+'\': Invalid type \''+type+'\'');
}
}
}
return output;
};exports.default=

serializeForNativeLayer;
//# sourceMappingURL=NativeSerializer.js.map