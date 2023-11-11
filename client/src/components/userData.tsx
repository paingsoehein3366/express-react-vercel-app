import { Box, Button, Typography } from "@mui/material"
import { useState, useEffect } from "react";

const UserData = () => {
    const [responseData, setResponseData] = useState([{
        id: 0,
        name: "",
        email: "",
        message: ""
    }]);
    console.log("responseData :", responseData);

    const [runFunction, setRunFunction] = useState({ number: 1 });
    useEffect(() => {
        showDataFunction();
    }, [runFunction])
    const showDataFunction = async () => {
        const response = await fetch("https://express-react-vercel-app.vercel.app/userData", {
            method: "GET",
            headers: { "content-type": "application/json" }
        });
        if (response.ok) {
            const responseFromData = await response.json();
            setResponseData(responseFromData);
        } else {
            console.log("unsucessful data");
            return null;
        }
    };
    const th = {
        color: "green",
        fontFamily: "sans-serif",
        width: "fit-content",
        borderBottom: "2px solid ",
    }
    return (
        <Box sx={{}}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                <Button variant="contained" onClick={() => setRunFunction({ ...runFunction, number: +1 })}>User Data</Button>
            </Box>
            <Box sx={{}}>
                {responseData.map((item) => {
                    return (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 2, border: "1px solid", justifyContent: "center" }}>
                            <Box sx={{ width: 200, }}>
                                <Typography style={th} variant="h6">Name</Typography>
                                <Typography sx={{ fontFamily: "sans-serif", color: "#0099ff" }}>{item.name}</Typography>
                            </Box>
                            <Box sx={{ width: 200 }}>
                                <Typography style={th} variant="h6">Email</Typography>
                                <Typography sx={{ fontFamily: "sans-serif", color: "#0099ff" }}>{item.email}</Typography>
                            </Box>
                            <Box sx={{ width: 200 }}>
                                <Typography style={th} variant="h6">Messages</Typography>
                                <Typography sx={{ fontFamily: "sans-serif", color: "#0099ff" }}>{item.message}</Typography>
                            </Box>
                        </Box>
                    )
                })}

            </Box>
        </Box>
    )
};
export default UserData;