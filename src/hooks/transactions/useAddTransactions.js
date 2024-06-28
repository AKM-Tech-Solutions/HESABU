import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserInfo } from "../user/useGetUserInfo";
import { useEffect, useState } from "react";

export const useAddTransaction = () => {
  const [productTotalPrice, setTotalPrice] = useState(0);
  const [productQty, setProductQty] = useState(0);

  const { userID } = useGetUserInfo();

  const transactionCollectionRef = collection(db, "transactions");
  const productsCollectionRef = collection(db, "products");

  const fetchUpdateProducts = async () => {
    try {
      const q = query(transactionCollectionRef);
      const querySnapshot = await getDocs(q);

      const updatedProductPrice = {};
      const updatedProductQuantity = {};

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        updatedProductPrice[doc.id] = parseInt(docData.totalPrice || 0);
        updatedProductQuantity[doc.id] = parseInt(docData.quantity || 0);
      });

      setTotalPrice(updatedProductPrice);
      setProductQty(updatedProductQuantity);
    } catch (error) {
      console.error(
        "Error fetching and updating product transactions doc:",
        error.message
      );
    }
  };

  const checkNameExistence = async (name) => {
    const nameQuery = query(productsCollectionRef, where("name", "==", name));
    const nameSnapShot = await getDocs(nameQuery);
    return !nameSnapShot.empty;
  };

  const addTransaction = async ({ name, totalPrice, quantity, date }) => {
    try {
      const parsedQuantity = parseInt(quantity, 10);
      const parsedTotalPrice = parseInt(totalPrice, 10);

      const nameExists = await checkNameExistence(name);
      if (!nameExists) {
        throw new Error(`No product found with this name: ${name}`);
      }

      await addDoc(transactionCollectionRef, {
        userID,
        name,
        totalPrice: parsedTotalPrice,
        quantity: parsedQuantity,
        date,
        createdAt: serverTimestamp(),
      });

      const productQuery = query(
        productsCollectionRef,
        where("name", "==", name)
      );
      const productSnapshot = await getDocs(productQuery);

      if (!productSnapshot.empty) {
        const productId = productSnapshot.docs[0].id;
        const existingQuantity = parseInt(
          productSnapshot.docs[0].data().quantity || 0
        );
        const existingTotalPrice = parseInt(
          productSnapshot.docs[0].data().totalPrice || 0
        );

        const updatedQuantity =
          parseInt(existingQuantity) - parseInt(parsedQuantity);
        const updatedValue =
          parseInt(existingTotalPrice) - parseInt(parsedTotalPrice);

        await updateDoc(doc(productsCollectionRef, productId), {
          quantity: updatedQuantity,
          totalPrice: updatedValue,
        });

        setProductQty((prevProductQty) => ({
          ...prevProductQty,
          [productId]: updatedQuantity,
        }));
        setProductValue((prevProductValue) => ({
          ...prevProductValue,
          [productId]: updatedValue,
        }));
      } else {
        throw new Error("Product not found after adding transaction");
      }

      fetchUpdateProducts();
    } catch (error) {
      console.error("Error adding transaction", error.message);
    }
  };

  useEffect(() => {
    console.log("I got cleaned");
    fetchUpdateProducts();
  }, []);

  return {
    addTransaction,

    productTotalPrice,
    productQty,
  };
};
