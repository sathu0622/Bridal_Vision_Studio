
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';

const ViewProduct = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/getImages')
            .then(res => {
                console.log('Get images response:', res.data);
                setImages(res.data);
            })
            .catch(err => console.log(err));
    }, []);


  return (
    <div>           
    {images.map(image => (
        <div key={image._id}>
            <img src={`http://localhost:5000/Images/${image.image}`} alt={image.name} />
            <p>Name: {image.name}</p>
            <p>Quantity: {image.quantity}</p>
            <p>Price: ${image.price}</p>
            <p>Size: {image.size}</p>
            <p>Colour: {image.colour}</p>
            
        </div>
    ))}
</div>
  )
}

export default ViewProduct