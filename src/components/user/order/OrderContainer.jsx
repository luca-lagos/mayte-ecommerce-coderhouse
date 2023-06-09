import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import { useAuth, useOrder } from "../../../hooks/CustomHooks";
import { Link, Navigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrderContainer = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { userLogged } = useAuth();
  const { getOrdersByUserId } = useOrder();

  const uid = userLogged?.uid;

  const FormatDate = (date) => {
    return date?.toDate().toLocaleString();
  };

  useEffect(() => {
    setLoading(true);
    getOrdersByUserId(uid).then((res) => {
      const result = res.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setOrders(result);
    });
    setTimeout(() => setLoading(false), 2500);
  }, [getOrdersByUserId, uid]);
  return (
    <>
      {userLogged == null && <Navigate to={"/"} />}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: { xs: 15, md: 22 },
          p: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={60} color="success" />
          </Box>
        ) : (
          <>
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  mb: 4,
                  color: "#66bb6a",
                  textDecoration: "underline",
                  textTransform: "uppercase",
                }}
              >
                MY ORDERS
              </Typography>
            </Box>
            {orders != "" ? (
              <Card
                sx={{
                  width: "95%",
                  p: 2,
                  display: "flex",
                  gap: 5,
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "auto",
                    maxHeight: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    overflowX: "hidden",
                  }}
                >
                  {orders.map((value) => (
                    <Box
                      key={value?.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 80,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: "#e9e9e9",
                      }}
                    >
                      <Typography variant="p">
                        ORDER:{" "}
                        <Typography variant="p" sx={{ fontWeight: "bold", fontSize: {xs: 13, md: "auto"} }}>
                          {value?.id}
                        </Typography>
                      </Typography>
                      <Typography variant="p" sx={{display: {xs: "none", md: "flex"}}}>
                        TOTAL:{" "}
                        <Typography variant="p" sx={{ fontWeight: "bold" }}>
                          ${value?.totalPrice}
                        </Typography>
                      </Typography>
                      <Typography variant="p" sx={{display: {xs: "none", md: "flex"}}}>
                        DATE:{" "}
                        <Typography variant="p" sx={{ fontWeight: "bold" }}>
                          {FormatDate(value?.date)}
                        </Typography>
                      </Typography>
                      <Link to={"/my-orders/" + value?.id}>
                        <Button
                          sx={{
                            display: {xs: "none", md: "flex"},
                            width: 150,
                            fontSize: 17,
                            fontWeight: "700",
                            backgroundColor: "#3c733f",
                            color: "white",
                            "&:hover": { backgroundColor: "#224024" },
                          }}
                        >
                          SEE ORDER
                        </Button>
                        <Button
                          sx={{
                            display: {xs: "flex", md: "none"},
                            width: "auto",
                            fontSize: 17,
                            fontWeight: "700",
                            backgroundColor: "#3c733f",
                            color: "white",
                            "&:hover": { backgroundColor: "#224024" },
                          }}
                        >
                          <VisibilityIcon/>
                        </Button>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Card>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mt: 12,
                }}
              >
                <SentimentVeryDissatisfiedIcon
                  sx={{ width: 150, height: "auto", color: "#66bb6a" }}
                />
                <Typography
                  variant="h3"
                  sx={{ fontSize: 20, fontWeight: "600", color: "#515151" }}
                >
                  Orders not found.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default OrderContainer;
