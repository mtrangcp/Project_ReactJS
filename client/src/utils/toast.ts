import Toastify from "toastify-js";
import removeCircle from "../assets/icons/remove_circle.png";
import closeToast from "../assets/icons/close-toast.png";
import checkCircle from "../assets/icons/check_circle.png";

export const showToastError = (msg: string) => {
  const htmlToastError = `
    <div class="toast-error">
      <div class="err-top">
        <div class="left">
          <img src=${removeCircle} alt="img" />
          <h4>Error</h4>
        </div>

        <img src=${closeToast} alt="" id="close-toast-error" />
      </div>

      <div class="err-bottom">
        ${msg}
      </div>
    </div>
  `;

  Toastify({
    text: htmlToastError,
    className: "custom-error-toast",
    duration: 2000,
    gravity: "top",
    position: "left",
    close: false,
    escapeMarkup: false,
    style: {
      background: "transparent",
      boxShadow: "none",
    },
  }).showToast();
};

export const showToastSuccess = (msg: string) => {
  const htmlToastSuccess = `
    <div class="toast-success">
      <img src=${checkCircle} alt="img" />
      <p>${msg}</p>
    </div>
  `;

  Toastify({
    text: htmlToastSuccess,
    className: "custom-error-toast",
    duration: 2000,
    gravity: "top",
    position: "left",
    close: false,
    escapeMarkup: false,
    style: {
      background: "transparent",
      boxShadow: "none",
    },
  }).showToast();
};
