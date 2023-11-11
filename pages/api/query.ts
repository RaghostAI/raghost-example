import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionId, query } = req.body;

  try {
    const url = `https://raghost.ai/api/ask`;
    const response = await axios.post(
      url,
      { collectionId, query },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RAGHOST_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
