import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStarHalfAlt as faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
  const stars = [];
  if (!rating) return <div></div>;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fasStar} color="#f2b01e" />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} color="#f2b01e" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} color="#d4d4d4" />);
  }

  return <div>{stars}</div>;
};

export default StarRating;