import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;

  console.log('Received userId:', userId); // Log userId for debugging

  if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: Number(userId) },
      });
      console.log('Deleted user:', deletedUser); // Log deleted user for debugging
      res.status(204).end(); // Return HTTP 204 (No Content) if successful
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Could not delete user' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
