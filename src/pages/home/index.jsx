import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/banner/index";
import "./home.scss";
import { useGlobalDataContext } from "../../hook/globalData";
import TypeHome from "../../components/typeHome";
import Card from "./../../components/card/index";

const Home = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setTitle } = useGlobalDataContext();

  useEffect(() => {
    setTitle("Dinh Dưỡng Từ Tôi");
  }, [setTitle]);
  const handleChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/webhook", // Sửa đường dẫn để gửi yêu cầu đến Flask
        { message: userMessage }
      );
      console.log(response.data); // In ra dữ liệu phản hồi từ Flask
      setBotResponse(response.data.response); // Lấy phản hồi của bot và cập nhật state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div>
      <div className="container pt-3">
        <Banner />
        <div className="row">
          <div className="title-body text-center py-3 mt-5" id="border-animate">
            <h2>các loại trà sữa</h2>
          </div>
          <TypeHome />
        </div>
        <div class="row">
          <div className="title-body text-center py-3 mt-5" id="border-animate">
            <h2>các loại nước giải khát</h2>
          </div>
          <Card />
        </div>
      </div>

      <button className="bottom-right-button" onClick={toggleChat}>
        tư vấn tôi
      </button>

      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-box-header">
            <h4>Chat</h4>
            <button className="close-chat" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chat-box-content">
            <input
              type="text"
              value={userMessage}
              onChange={handleChange}
              placeholder="Nhập tin nhắn của bạn..."
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Gửi
            </button>
            <div>Phản hồi của Bot: {botResponse}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
