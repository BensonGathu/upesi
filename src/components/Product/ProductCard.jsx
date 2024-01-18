import React from 'react';

const ProductCard = (props) => {
  return (
    <div className="bg-white rounded-md shadow-md h-full">
      <div className="">
        <img
          src={props.image}
          alt={props.imageAlt}
          className="object-fill object-center max-w-full max-h-full transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            <a href={props.href} className="hover:underline">
              {props.title} 
             
            </a>
          </h3>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-xs font-medium text-gray-900">{props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
