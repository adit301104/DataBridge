import React, { useEffect, useState } from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../Redux/appSlice";

const Messages = () => {
  const { searchText, emails } = useSelector((store) => store.appSlice);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toMillis?.() || null,
      }));

      dispatch(setEmails(allEmails));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const lowerSearchText = searchText.toLowerCase();

    const filtered = emails?.filter(
      (email) =>
        email?.subject?.toLowerCase().includes(lowerSearchText) ||
        email?.to?.toLowerCase().includes(lowerSearchText) ||
        email?.message?.toLowerCase().includes(lowerSearchText)
    );

    setFilteredEmails(filtered);
  }, [searchText, emails]);

  return (
    <div className="flex flex-col h-[75vh] md:h-[85vh] overflow-y-auto px-2 md:px-4">
      {loading ? (
        <p className="text-center text-gray-500 py-4">Loading emails...</p>
      ) : filteredEmails?.length > 0 ? (
        filteredEmails.map((email) => <Message key={email.id} email={email} />)
      ) : (
        <p className="text-center text-gray-500 py-4">No emails found.</p>
      )}
    </div>
  );
};

export default Messages;
