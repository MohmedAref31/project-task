const fs = require("fs").promises;
const path = require("path")


const deleteImage = async(img)=>{
    try{
        console.log(img)
        const file = path.join(__dirname,"../../uploads",img)
        console.log(path.join(__dirname,"../../uploads",img))
        await fs.unlink(file)
                
    }catch(e){
        return e.message
    }
}

module.exports = deleteImage