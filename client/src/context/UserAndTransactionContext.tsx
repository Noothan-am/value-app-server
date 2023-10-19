import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UserAndTransactionContextValue = {
  allTransaction: any;
  setAllTransaction: React.Dispatch<any>;
  userDetails: any;
  setUserDetails: React.Dispatch<any>;
  loading: any;
  setLoading: React.Dispatch<any>;
};

const userAndTransaction = createContext<UserAndTransactionContextValue | null>(
  null
); //

export function UserAndTransactionContext({ children }: any) {
  const [userDetails, setUserDetails] = useState<any>();
  const [allTransaction, setAllTransaction] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "43186f386b5611eeb9620242ac120002",
          }),
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        setUserDetails(jsonData);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, []);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/get-transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        console.log(jsonData);
        setAllTransaction(jsonData);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchAllTransactions()
      .then(() => {
        console.log("All transactions fetched successfully");
        fetchUserDetails()
          .then(() => {
            "succesfully fetched user details";
            setLoading(false);
          })
          .catch((err) => {
            console.log("error while fetching the", err);
          });
      })
      .catch((err) =>
        console.log("error while fetching all transactions", err)
      );
  }, [fetchAllTransactions, fetchUserDetails]);

  return (
    <userAndTransaction.Provider
      value={{
        allTransaction,
        setAllTransaction,
        userDetails,
        loading,
        setLoading,
        setUserDetails,
      }}
    >
      {children}
    </userAndTransaction.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(userAndTransaction);
};
