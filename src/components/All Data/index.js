import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/";

const TrackingData = () => {
  const [trackData, setTrackData] = useState();
  console.log("blogs", trackData);
  //get blogs
  const getAllTrackData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/tracking/all-tracking`);
      console.log("data", data);
      if (data?.success) {
        setTrackData(data.track);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTrackData();
  }, []);
  return (
    <div>
      {trackData &&
        trackData.map((blog, ind) => <h1 key={ind}>{blog?.title}</h1>)}
    </div>
  );
};

export default TrackingData;
