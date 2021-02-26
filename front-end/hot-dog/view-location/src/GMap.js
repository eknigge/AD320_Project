import React from 'react';
import css from './css/styles.css'

const GMap = () =>{
    return (
        <div className="wrapper">
          <iframe src='https://maps.google.com/maps?q=North%20Seattle%20College&t=&z=13&ie=UTF8&iwloc=&output=embed' width='800' height='700' frameborder='0'  style={{border:0}} allowfullscreen='' aria-hidden='false' tabindex='0'></iframe>
        </div>
    );
 }

 export default GMap;