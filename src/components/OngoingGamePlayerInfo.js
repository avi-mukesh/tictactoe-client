import React, { useEffect } from "react";
import { useGetUserQuery } from "../app/services/user/userService";
import { combineSlices } from "@reduxjs/toolkit";

const OngoingGamePlayerInfo = ({ playerId }) => {
  const { data: player, isLoading, error } = useGetUserQuery(playerId);

  useEffect(() => {
    console.log(player);
  }, [player]);

  return <div>Player Name here</div>;
};

export default OngoingGamePlayerInfo;
