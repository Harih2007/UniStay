import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={room.images?.[0] || '/placeholder-room.jpg'}
          alt={room.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image';
          }}
        />
        {room.status === 'verified' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ✓ Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{room.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{room.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(room.rent)}<span className="text-sm font-normal text-gray-500">/month</span>
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {room.address}
          </div>
          {room.distance && (
            <div className="mt-1 text-xs text-gray-500">
              {room.distance} from search location
            </div>
          )}
        </div>
        
        <Link
          to={`/rooms/${room.id}`}
          className="block w-full text-center btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;