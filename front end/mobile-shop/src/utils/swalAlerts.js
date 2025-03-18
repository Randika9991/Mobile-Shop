import Swal from "sweetalert2";

// Success Alert
export const showSuccessAlert = (message = "Success!") => {
    Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
    });
};

// Error Alert
export const showErrorAlert = (message = "Something went wrong.") => {
    Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
    });
};

// Confirmation Alert (for delete actions, etc.)
export const showConfirmationAlert = async (message = "Are you sure?", callback) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    });

    if (result.isConfirmed && callback) {
        callback();
    }
};
