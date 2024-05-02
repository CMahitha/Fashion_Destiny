import React, { useState } from "react";
import "./ProductCard.css";
import Countdown from "react-countdown";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    title,
    brand,
    imageUrl,
    price,
    discountedPrice,
    color,
    discountPersent,
    dealtime
  } = product;
  const navigate = useNavigate();
  const enddate = new Date(dealtime);
  const [isExpired, setIsExpired] = useState(Date.now() > enddate);

  const Completionist = () => (
    <div className="flex space-x-2 items-center">
      <p className="bold">₹{price}</p>
      <div className="bg-red-500 text-white px-2 py-1 rounded-md">Expired</div>
    </div>
  );

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsExpired(true);
      return <Completionist />;
    } else {
      return (
        <div className="flex flex-col space-x-2 items-center">
          <div className="flex space-x-2">
            <p className="font-semibold">₹{discountedPrice}</p>
            <p className="opacity-50 line-through">₹{price}</p>
            <p className="text-green-600 font-semibold">
              {discountPersent}% off
            </p>
          </div>
          <div className="text-red-400">
            deals ends in :{hours}:{minutes}:{seconds}
          </div>
        </div>
      );
    }
  };

  const handleNavigate = () => {
    if (!isExpired) { 
      navigate(`/product/${product?.id || product?._id || 2}`);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={`productCard w-[15rem] border m-3 transition-all cursor-pointer ${
        isExpired ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="h-[21rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3 ">
        <div>
          <p className="font-bold opacity-60">{brand}</p>
          <p className="">{title}</p>
          <p className="font-semibold opacity-50">{color}</p>
        </div>
        <div className="flex flex-col">
          <Countdown date={enddate+Date.now()} renderer={renderer} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
