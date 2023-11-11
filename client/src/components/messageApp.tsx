import { Box, Typography } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect, useState } from "react";

const MessageApp = () => {
    const [data, setData] = useState({ message: "" });
    const [responseData, setResponseData] = useState([]);
    const [replyData, setReplyData] = useState([{ id: 0, messages: "" }]);
    const [runFunction, setRunFunction] = useState({ number: 1 });
    useEffect(() => {
        showDataFunction();
        replyDataFunction();
    }, [runFunction]);
    // showDataFunction
    const showDataFunction = async () => {
        const response = await fetch("http://localhost:5000/showData", {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        if (response.ok) {
            const responseFromData = await response.json();
            setResponseData(responseFromData.map((item: { messages: any; }) => item.messages));
        } else {
            console.log("unsucessful data");
            return null;
        }
    };
    // reply data function
    const replyDataFunction = async () => {
        const replyResponse = await fetch("http://localhost:5000/reply", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });
        if (replyResponse.ok) {
            const replyResponseJson = await replyResponse.json();
            console.log("replyData: ", replyResponseJson);
            setReplyData(replyResponseJson);
        } else {
            return null;
        }
    }
    // sendDataFunction
    const sendDataFunction = async () => {
        setRunFunction({ ...runFunction, number: +1 });
        setData({ ...data, message: "" });
        if (!data.message) return null;
        const response = await fetch("http://localhost:5000/message", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseFromData = await response.json();
            console.log("responseFromData :", responseFromData);
            setRunFunction({ ...runFunction, number: +1 });
        } else {
            console.log("unsucessful");
            return null;
        }
    }
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}>
            <Box sx={{ width: "100vh", bgcolor: "green", position: "sticky", top: 0, mt: 15 }}></Box>
            <Box
                sx={{
                    bgcolor: "gray",
                    width: 284,
                    minHeight: 200,

                    p: 1,
                }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {replyData.map((item) => {
                        return (
                            <Box key={item.id}>
                                <Typography sx={{ color: "skyblue", mt: 2, bgcolor: "blue" }}>{item.messages}</Typography>
                            </Box>
                        )
                    })}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", mt: 4, minHeight: "auto", textAlign: "right", }}>
                    {responseData.map((item) => {
                        return (
                            <Box
                                key={item}
                            >
                                <Typography sx={{ color: "greenyellow", mt: 2, bgcolor: "red" }}>{item}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#0099ff",
                minWidth: 268,
                p: 2,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                position: "sticky",
                bottom: 0
            }}>
                <input
                    value={data.message}
                    onChange={(evt) => setData({ ...data, message: evt.target.value })}
                    style={{ minWidth: 200, padding: 5 }}
                    type="text"
                />
                <SendRoundedIcon
                    onClick={sendDataFunction}
                    sx={{
                        color: "blue",
                        ml: 1,
                        cursor: "pointer",
                        "&:active": { color: "#006eff" }
                    }}
                />
            </Box>
        </Box>
    )
};
export default MessageApp;