import React, { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import loaiServices from "../services/loai";
const TypeHome = () => {
  const [allType, setAllType] = useState([]);
  useEffect(() => {
    getAllType();
  }, []);
  const getAllType = async () => {
    try {
      const res = await loaiServices.getAll();
      if (res.errorCode === 0) {
        setAllType(res.data.loais);
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      style={{ width: "100%", padding: 10 }}
      gap={10}
    >
      {allType?.map((type) => (
        <Button color="default" variant="dashed">
          {type.ten_loai}
        </Button>
      ))}
    </Flex>
  );
};

export default TypeHome;
