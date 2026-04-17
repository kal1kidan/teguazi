import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        {/* Background Image Loading */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://i.pinimg.com/736x/8f/fa/dc/8ffadce571b4f59fd0febc5ab2fba5eb.jpg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 to-earth-900/90"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center text-white px-4 mt-16">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-gold-400 drop-shadow-lg">
            Discover the Origins
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light text-earth-100 drop-shadow-md">
            Journey through the breathtaking landscapes and profound history of Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/explore" className="btn-primary flex items-center bg-gold-500 text-forest-800 hover:bg-gold-400 hover:text-forest-900">
              Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/book" className="btn-outline border-white text-white hover:bg-white/10">
              Book a Tour
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-earth-900 text-white">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gold-400 mb-6">The Land of Origins</h2>
              <p className="text-lg text-earth-100/90 mb-6 leading-relaxed">
                Ethiopia is a true mosaic of extraordinary natural beauty, sweeping landscapes, and a profoundly ancient culture. 
                Whether you are trekking the dramatic heights of the Simien Mountains or marveling at the rock-hewn churches of Lalibela, 
                every journey here reveals a story thousands of years in the making.
              </p>
              <p className="text-lg text-earth-100/90 leading-relaxed">
                Experience unparalleled hospitality, savor the rich aroma of traditional Ethiopian coffee ceremonies, and witness traditions that have remained unchanged for centuries.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1620619861689-5a6396eec50e?auto=format&fit=crop&q=80&w=1000" 
                alt="Ethiopian Culture" 
                className="rounded-lg shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-forest-700 p-6 rounded-lg shadow-xl hidden md:block border-4 border-earth-900">
                <p className="font-serif italic text-gold-400 text-xl font-semibold">"A world unto itself."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
