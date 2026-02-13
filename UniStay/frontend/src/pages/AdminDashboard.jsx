import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { formatPrice, getErrorMessage } from '../utils/helpers';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchUnverifiedRooms();
  }, []);

  const fetchUnverifiedRooms = async () => {
    try {
      const response = await axiosInstance.get('/admin/rooms');
      setRooms(response.data);
    } catch (error) {
      toast.error('Failed to load rooms for verification');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationAction = (room, action) => {
    setSelectedRoom(room);
    setActionType(action);
    setShowModal(true);
    setReason('');
  };

  const submitVerification = async () => {
    if (!selectedRoom || !actionType) return;

    try {
      const payload = {
        status: actionType,
        ...(reason && { reason })
      };

      await axiosInstance.patch(`/admin/verify/${selectedRoom.id}`, payload);
      
      toast.success(`Room ${actionType} successfully`);
      setShowModal(false);
      setSelectedRoom(null);
      setActionType('');
      setReason('');
      fetchUnverifiedRooms();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Room Verification</h1>
          <p className="text-gray-600">Review and verify property listings</p>
        </div>

        {/* Verification Modal */}
        {showModal && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {actionType === 'verified' ? 'Verify Room' : 'Reject Room'}
                </h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Room: {selectedRoom.title}</p>
                  <p className="text-sm text-gray-600">Owner: {selectedRoom.owner?.name} ({selectedRoom.owner?.email})</p>
                </div>

                {actionType === 'rejected' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for rejection (optional)
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="input-field"
                      rows={3}
                      placeholder="Provide a reason for rejection..."
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitVerification}
                    className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                      actionType === 'verified'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {actionType === 'verified' ? 'Verify' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No rooms pending verification at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {rooms.map((room) => (
              <div key={room.id} className="card p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Room Image */}
                  <div className="lg:w-1/3">
                    <img
                      src={room.images?.[0] || 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image'}
                      alt={room.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Room Details */}
                  <div className="lg:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {room.address}
                        </div>
                        <div className="text-2xl font-bold text-primary-600 mb-3">
                          {formatPrice(room.rent)}<span className="text-sm font-normal text-gray-500">/month</span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Pending Review
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{room.description}</p>

                    {/* Owner Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Owner Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Name:</span> {room.owner?.name}</p>
                        <p><span className="font-medium">Email:</span> {room.owner?.email}</p>
                        <p><span className="font-medium">Submitted:</span> {new Date(room.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    {room.amenities && room.amenities.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleVerificationAction(room, 'verified')}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                      >
                        Verify Room
                      </button>
                      <button
                        onClick={() => handleVerificationAction(room, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                      >
                        Reject Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;