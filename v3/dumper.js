const luamin = require('./luamin.js');
const fs = require('fs');

const started_time = Date.now();
console.log('Beautifying script...')
luamin.beautify();

const output = fs.readFileSync(__dirname + '\\output.lua', 'utf8');

const matches = (output.match(
/(.+)\[(.+)\[(.+)\]\] = (.+)\[(.+)\[(.+)\]\];$/gm
))

if (matches) {
    try {
        let output = fs.writeFileSync(__dirname + '\\moonsec_v3_output.txt', '');
        fs.appendFileSync(__dirname + '\\moonsec_v3_output.txt', '[BYFRON] - Moonsec V3 Dumper @ https://discord.gg/SXQvSGme7F \n\n');
        for (index = 0; index < matches.length; index++) {
            if (matches[index].match(/[\+\/\-\%\*\#]/gm)) {
                matches.splice(index, index);
            };
        };
        for (index = 0; index < matches.length; index++) {
            console.log(`[${index}]: ${matches[index]}`);
            fs.appendFileSync(__dirname + '\\moonsec_v3_output.txt', `[${index}]: ${matches[index]}\n`);
        }
        const ended_time = Date.now();
        console.log(`Found ${matches.length}!`);
        const final_time = ended_time - started_time;

        console.log('Elapsed time: ' + final_time / 1000 + " seconds");
        console.log('Wrote every match to a file!');

        console.log('Adding prints to the beautified file and minifying it...');
        let beautified_output = fs.readFileSync(__dirname + '\\output.lua', 'utf8');

        for (index = 0; index < matches.length; index++) {
            beautified_output = beautified_output.replace(matches[index], matches[index] + ` print(${(function(thematch){
                thematch = thematch.replace(/(.+)\[(.+)\[(.+)\]\] =/, "");
                thematch = thematch.replace(/;/, "");
                thematch = thematch.replace(/\[.+\]/, "");
                console.log(thematch);
                return thematch
            })(matches[index])})`)
        };
        beautified_output = luamin.minify(true, beautified_output);
        fs.writeFileSync(__dirname + '\\output.lua', beautified_output)
    }
    catch (err) {
        console.log(`[!] - Lua-Dumper had a error! ${err}`);
    }
}