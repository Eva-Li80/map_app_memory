import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

async function main(){
    const password = await hash('test', 12)
    const user = await prisma.user.upsert({
        where: {email: "eva@gmail.com"},
        update: {},
        create: {
            email: "eva@gmail.com",
            name: "Eva",
            password
        }
    })
    console.log(user)
}

main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
    await prisma.$disconnect()
})