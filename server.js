console.clear()
const app = require("./src/app");

const port = process.env.PORT || 3055;
const server = app.listen(port,()=>{
    console.log(`👉 VIRT eCommerce start with http://localhost:${port}`)
})

process.on('SIGINT',()=>{
    server.close(()=>console.log("☢️☢️☢️Exit!!☢️☢️☢️"))
})