import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🟢 Plaid client config
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});
const client = new PlaidApi(config);

// Store access token in memory temporarily
let ACCESS_TOKEN = null;

// Create link token
router.post("/create-link-token", async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: "user-id-123", // You can replace with Firebase UID if needed
      },
      client_name: "Money Nexus",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create link token");
  }
});

// Exchange public token and save access token
router.post("/exchange-public-token", async (req, res) => {
  const { public_token } = req.body;
  try {
    const tokenResponse = await client.itemPublicTokenExchange({ public_token });
    ACCESS_TOKEN = tokenResponse.data.access_token;

    res.json({ message: "Access token saved successfully!" });
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    res.status(500).send("Failed to exchange token");
  }
});

// Get transactions
router.get("/transactions", async (req, res) => {
  try {
    if (!ACCESS_TOKEN) {
      return res.status(400).json({ error: "Access token not set. Connect Plaid first." });
    }

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();

    const txnResponse = await client.transactionsGet({
      access_token: ACCESS_TOKEN,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      options: { count: 10, offset: 0 },
    });

    res.json({ transactions: txnResponse.data.transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});


export default router;
