// Remember, we're gonna use strict mode in all scripts now!
"use strict";
let tempData = [17,21,23]
let str ='';
for (let i = 0; i < tempData.length; i++) {
    str = str + `... ${tempData[i]}°C  in ${i + 1}`;
}

console.log(str);