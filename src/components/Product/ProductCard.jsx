
import React from 'react';



const ProductCard = (props) => {
  return (

    <>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className="w-full h-full flex justify-center items-center">
       
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img className="max-h-[160px] group-hover:scale-110 transition duration-300" src={props.image} alt={props.imageAlt} />

          </div>

        </div>

    

      </div>

      <div>
        <a className="font-semibold mb-1" href={props.href}>{props.title}</a>
        <div className="font-semibold">$ {props.price}</div>
      </div>
      
   </>

  );
};

export default ProductCard;
