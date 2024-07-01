const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const password = await hash('test', 12);
    try {
        const user = await prisma.user.upsert({
            where: { email: "eva@gmail.com" },
            update: {},
            create: {
                email: "eva@gmail.com",
                name: "Eva",
                password,
                posts: {}
            }
        });
        console.log(user);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
