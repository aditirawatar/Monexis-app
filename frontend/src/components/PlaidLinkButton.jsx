import React from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

const PlaidLinkButton = ({ onTransactionsFetched }) => {
  const [linkToken, setLinkToken] = React.useState(null);

  React.useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/plaid/create-link-token");
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error("Failed to create link token", error);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token) => {
    try {
      // Step 1: Exchange token
      await axios.post("http://localhost:5000/api/plaid/exchange-public-token", {
        public_token,
      });

      // 🟢 Wait a short time to ensure backend has access token stored
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

      // Step 2: Fetch transactions
      const transactionsResponse = await axios.get("http://localhost:5000/api/plaid/transactions");
      onTransactionsFetched(transactionsResponse.data.transactions);
    } catch (error) {
      console.error("Failed to exchange token or fetch transactions", error);
    }
  };

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Connect with Plaid
    </button>
  );
};

export default PlaidLinkButton;
