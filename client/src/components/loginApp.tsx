import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const LoginApp = () => {
    const [data, setData] = useState({ email: "", password: "" });

    const functionData = async () => {
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })

    }
    return (
        <Box>
            <Typography>Hello Login page</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField
                    label="Email"
                    sx={{ minWidth: 300 }} placeholder="Email"
                    onChange={(evt) => setData({ ...data, email: evt.target.value })}
                />
                <TextField
                    type="password"
                    label="Password"
                    sx={{ minWidth: 300, marginY: 2 }} placeholder="Password"
                    onChange={(evt) => setData({ ...data, password: evt.target.value })}
                />
                <Button onClick={functionData} sx={{ minWidth: 300 }} variant="contained">Log in</Button>
            </Box>
        </Box>
    )
};
export default LoginApp;