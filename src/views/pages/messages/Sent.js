import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAllMessage } from '../../../loader/db/db';

export default props => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetchAllMessage();
      console.log(res)
    };
    fetchMessages();
  }, [])

  return <>
    <div>Sent Message list</div>
  </>
}
