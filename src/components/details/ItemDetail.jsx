import {
  Box,
  Chip,
  Card,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import ItemCount from "./ItemCount";
import { useEffect } from "react";
import { useCart } from "../../hooks/customHooks";
import TinyColor from "tinycolor2";

const ItemDetail = ({ item, actualLink }) => {
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { cart, AddToCart, CloseAllSnackbar, snackSuccess, snackError } =
    useCart();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const HandleSubstract = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const HandleAdd = () => {
    quantity < item[0].stock && setQuantity(quantity + 1);
  };

  const HandleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const HandleAddToCart = () => {
    const {stock, ...newItem} = item[0];
    AddToCart(newItem, quantity, actualLink);
  };

  return (
    <>
      <Snackbar
        open={snackbar}
        onClose={HandleCloseSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={HandleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Recuerde seleccionar los requisitos de la prenda
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackError}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          La cantidad elegida es mayor al stock
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackSuccess}
        onClose={CloseAllSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          onClose={CloseAllSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ha guardado la prenda en el carrito
        </Alert>
      </Snackbar>
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
        <Card
          sx={{
            p: 2,
            display: "flex",
            gap: 5,
            maxWidth: { xs: 350, md: 1200 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              width: { xs: 350, md: "auto" },
              mb: { xs: "-25px" },
            }}
          >
            <Typography
              component={"h1"}
              sx={{ fontSize: 45, fontWeight: "bold" }}
            >
              {item[0]?.name}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: 350, md: "auto" } }}>
            <img src={item[0]?.image} alt="" style={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              mt: { xs: "-13px", md: 3 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
              width: { xs: 350, md: "auto" },
            }}
          >
            <Typography
              component={"h1"}
              sx={{
                fontSize: 45,
                fontWeight: "bold",
                display: { xs: "none", md: "flex" },
              }}
            >
              {item[0]?.name}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}
            >
              <Chip
                sx={{ fontWeight: 600 }}
                label={"STOCK: " + item[0]?.stock}
              />
              <Chip
                sx={{
                  fontWeight: 600,
                  backgroundColor: item[0]?.color,
                  color: TinyColor(item[0]?.color).isDark()
                    ? "white"
                    : "#272727",
                }}
                label={item[0].color}
              />
              <Chip
                sx={{ fontWeight: 600 }}
                label={
                  "SIZE:" + item[0]?.size === "Small"
                    ? "S"
                    : item[0]?.size === "Medium"
                    ? "M"
                    : item[0]?.size === "Large"
                    ? "L"
                    : "XL"
                }
              />
            </Box>
            <Typography
              component={"p"}
              sx={{
                maxWidth: { xs: 350, md: 750 },
                mt: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {item[0]?.description}
            </Typography>
            <Typography
              component={"h2"}
              sx={{ fontSize: { xs: 50, md: 40 }, color: "#66bb6a" }}
            >
              ${item[0]?.price}
            </Typography>
            <ItemCount
              quantity={quantity}
              HandleAdd={HandleAdd}
              HandleSubstract={HandleSubstract}
              HandleAddToCart={HandleAddToCart}
            />
          </Box>
        </Card>
      )}
    </>
  );
};

export default ItemDetail;
