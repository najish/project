console.log("start")

const start = Date.now()
for (let i = 0; Date.now() - start < 2000; i++);
    console.log("Hey")
console.log("end")
