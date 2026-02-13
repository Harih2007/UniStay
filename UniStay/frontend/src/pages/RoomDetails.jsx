import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import RoomGallery from '../components/RoomGallery';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axiosInstance.get(`/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        toast.error('Failed to load room details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, navigate]);

  const handleContactOwner = async () => {
    if (!isAuthenticated()) {
      toast.info('Please login to contact the owner');
      navigate('/login');
      return;
    }

    setInquiryLoading(true);
    try {
      await axiosInstance.post(`/rooms/${id}/inquiries`);
      toast.success('Inquiry sent successfully! The owner will contact you soon.');
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <RoomGallery images={room.images} />

            {/* Room Info */}
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {room.address}
                  </div>
                </div>
                {room.status === 'verified' && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Verified
                  </div>
                )}
              </div>

              <div className="text-3xl font-bold text-primary-600 mb-6">
                {formatPrice(room.rent)}<span className="text-lg font-normal text-gray-500">/month</span>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{room.description}</p>
              </div>

              {room.amenities && room.amenities.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            {room.latitude && room.longitude && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[room.latitude, room.longitude]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[room.latitude, room.longitude]}>
                      <Popup>{room.title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="card p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Contact Owner</h3>
              
              {room.owner && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-600 font-semibold">
                        {room.owner.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{room.owner.name}</p>
                      <p className="text-sm text-gray-600">{room.owner.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleContactOwner}
                disabled={inquiryLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {inquiryLoading ? 'Sending...' : 'Contact Owner'}
              </button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Your contact information will be shared with the owner
              </p>
            </div>

            {/* Quick Info */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-semibold">{formatPrice(room.rent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${
                    room.status === 'verified' ? 'text-green-600' : 
                    room.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {room.status?.charAt(0)?.toUpperCase() + room.status?.slice(1)}
                  </span>
                </div>
                {room.available_from && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available From</span>
                    <span className="font-semibold">
                      {new Date(room.available_from).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;