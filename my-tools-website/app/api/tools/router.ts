import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from "@clerk/nextjs/server";

const getTools = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json([]);
  }

  try {
    const response = await fetch(`http://localhost:8080/tools?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tools = await response.json();
    return res.status(200).json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return res.status(500).json([]);
  }
};

export default getTools;