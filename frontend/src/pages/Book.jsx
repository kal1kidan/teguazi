import { useState, useEffect } from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

export default function Book() {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    destination: '',
    date: '',
    travelers: 1
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/destinations')
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, destination: data[0]._id }));
        }
      })
      .catch(err => console.error('Error fetching destinations:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Processing your booking...' });

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Booking confirmed successfully!' });
        setFormData({ ...formData, user: '', date: '', travelers: 1 });
      } else {
        setStatus({ type: 'error', message: 'Failed to create booking. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again later.' });
    }
  };

  return (
    <div className="py-16 min-h-[calc(100vh-140px)] flex items-center justify-center px-4 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'linear-gradient(rgba(30, 18, 13, 0.9), rgba(30, 18, 13, 0.95)), url("https://i.pinimg.com/736x/58/3d/08/583d08b030d54aafc65a144d0734e417.jpg")' }}>
      <div className="container-narrow max-w-5xl grid md:grid-cols-5 gap-0 shadow-2xl rounded-2xl overflow-hidden bg-earth-900/80 border border-white/10 w-full backdrop-blur-sm">
        
        {/* Left Side Info */}
        <div className="md:col-span-2 bg-forest-900/80 p-6 md:p-10 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gold-400">Plan Your Journey</h2>
            <p className="text-earth-100/90 leading-relaxed mb-8">
              Experience the majesty of Ethiopia. Reserve your next adventure with Teguaዥ and uncover the land of origins.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-forest-600 p-2 md:p-3 rounded-full"><MapPin className="text-gold-400 h-5 w-5" /></div>
              <span className="font-medium text-forest-50 tracking-wide">Expertly Curated</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-forest-600 p-2 md:p-3 rounded-full"><Calendar className="text-gold-400 h-5 w-5" /></div>
              <span className="font-medium text-forest-50 tracking-wide">Flexible Scheduling</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-forest-600 p-2 md:p-3 rounded-full"><Users className="text-gold-400 h-5 w-5" /></div>
              <span className="font-medium text-forest-50 tracking-wide">Elite Small Groups</span>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-3 p-6 md:p-10 bg-transparent text-white">
          <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-8 font-serif">Booking Details</h3>
          
          {status.message && (
            <div className={`p-4 rounded-md mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800 border border-blue-200'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-earth-100 mb-2">Full Name</label>
              <input 
                type="text" 
                name="user"
                required
                value={formData.user}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-earth-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition bg-earth-900/50 text-white placeholder-earth-400"
                placeholder="Abebe Bikila"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-earth-100 mb-2">Destination</label>
              <select 
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-earth-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition bg-earth-900/50 text-white"
              >
                {destinations.length === 0 ? (
                  <option value="">Loading destinations...</option>
                ) : (
                  destinations.map(dest => (
                    <option key={dest._id} value={dest._id} className="bg-earth-800">{dest.name} - {dest.location}</option>
                  ))
                )}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-earth-100 mb-2">Travel Date</label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-earth-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition bg-earth-900/50 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-earth-100 mb-2">Travelers</label>
                <select 
                  name="travelers"
                  required
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-earth-700 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition bg-earth-900/50 text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num} className="bg-earth-800">{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-forest-600 text-gold-400 font-bold py-4 rounded-md hover:bg-forest-700 transition duration-300 shadow-md transform hover:-translate-y-0.5 mt-4 text-lg"
            >
              Confirm Reservation
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
