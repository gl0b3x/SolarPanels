import React, { useState } from "react";
import classes from "./AuthModal.module.css";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

const CartModal = ({ visible, setVisible }) => {
  const rootClasses = [classes.LoginModal];
  const [willLogin, setWillLogin] = useState(true);

  if (visible) {
    rootClasses.push(classes.active);
  }

  function closeModal() {
    setVisible(false);
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={rootClasses.join(" ")} onClick={closeModal}>
      <div className={classes.LoginModalContent} onClick={handleContentClick}>
        {willLogin ? (
          <>
            <LoginForm setWillLogin={setWillLogin} setVisible={setVisible} />
          </>
        ) : (
          <>
            <RegisterForm setWillLogin={setWillLogin} setVisible={setVisible} />
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
