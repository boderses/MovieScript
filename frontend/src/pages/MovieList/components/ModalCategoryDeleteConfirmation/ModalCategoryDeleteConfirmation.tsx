import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  categoryName,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="black">
          Are you sure you want to delete "{categoryName}"?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button onClick={onConfirm} variant="contained" color="error">
            Confirm
          </Button>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
