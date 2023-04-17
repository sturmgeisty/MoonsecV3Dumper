const { match } = require('assert');
const luamin = require('./luamin.js');
const fs = require('fs');

const started_time = Date.now();
console.log('Renaming variables of the script...')
luamin.minify(false);


var input = fs.readFileSync(__dirname + '\\input.lua', 'utf8');
var x = fs.writeFileSync(__dirname + '\\dumped.lua', '-- [BYFRON] : Byfron Moonsec V3 Beta Dumper @ https://discord.gg/SXQvSGme7F\nthingbytecode="";\n' + input);
var newinput = fs.readFileSync(__dirname + '\\dumped.lua', 'utf8');
const matches = (newinput.match(
/local function (.)\(.\)return (.)\[.\]end/m
))

if (matches) {
    try {
        let function_bc = matches[0];
        let newfunction = function_bc;
        newfunction = newfunction.replace(/return (.)\[(.)\]/m, `thingbytecode=thingbytecode..${(
            function(){
                let _cache_match = function_bc.match(/(.)\[(.)\]/m)[0];
                return _cache_match
            }
        )()}return ${(
            function(){
                let _cache_match = function_bc.match(/(.)\[(.)\]/m)[0];
                return _cache_match
            }
        )()}`)
        newinput = newinput.replace(function_bc, newfunction);
        // if (.)~=(.) then local (.)=(.);
        // this shit only works without anti tamper and max security on
        let match_thing = newinput.match(/if (.)~=(.) then local (.)=(.);/m);
        console.log(match_thing);
        if (match_thing[0]) {
            newinput = newinput.replace(match_thing[0], match_thing[0] + "thingbytecode2=thingbytecode:match('MoonSec_StringsHiddenAttr(.+)');print('output 1:\\n');print(thingbytecode);print('\\noutput 2:\\n');print(thingbytecode2);");
        }
        fs.writeFileSync(__dirname + '\\dumped.lua', newinput);
        console.log('wrote deobfuscation stuff, run in studio or wtv u chosed');
    }
    catch (err) {
        console.log(`[!] - Lua-Dumper had a error! ${err}`);
    }
}