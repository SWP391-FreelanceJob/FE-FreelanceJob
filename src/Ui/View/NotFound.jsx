import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  // const handleMouseMove = useCallback((event) => {

  // }, []);

  // useEffect(() => {
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <div className="not-found">
      <div className="box">
        {/* <div className="box__ghost">
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>
          <div className="symbol"></div>

          <div className="box__ghost-container">
            <div className="box__ghost-eyes">
              <div className="box__eye-left"></div>
              <div className="box__eye-right"></div>
            </div>
            <div className="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="box__ghost-shadow"></div>
        </div> */}

        <div className="box__description">
          <div className="box__description-container">
            <h1 className="!mb-16">404</h1>
            <div className="box__description-title mt-8">Whoops!</div>
            <div className="box__description-text">
              Có vẻ như không có ai ở đây cả
            </div>
          </div>

          <a href="/" className="box__button">
            Trở về
          </a>
        </div>
      </div>
    </div>
  );
}
