let r = 5;
let name = 0;
do {
    name = 50 + r;
    console.log(name == undefined);
    console.log(name == undefined || name < 1 || name > 50);
    r--;
} 
while (name == undefined || name < 1 || name > 50);
console.log(name);