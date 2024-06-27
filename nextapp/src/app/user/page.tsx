import prisma from "@/lib/db"
export default async function User() {

    const users = await prisma.user.findMany();

    return (
        <div>
            <h1>User sidan</h1>
           {users.map((user) => (
            <div> Hej: {user.name}</div>
           ))}
        </div>
    )
}
// "use client";

// import { useEffect, useState } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// export default function Home() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('/api/users');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: User[] = await response.json();
//         setUsers(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Users</h1>
//       {users.map((user) => (
//         <div key={user.id}>
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

