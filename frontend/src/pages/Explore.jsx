import { useRef, useState, useEffect } from "react";
import { Search, MapPin, Heart, Info, ArrowDown } from "lucide-react";


export default function Explore() {
  const sectionRef = useRef(null);

  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((i) => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/destinations');
        const data = await res.json();
        // Map backend imageURL to img expected by component
        const mappedData = data.map(item => ({
          ...item,
          img: item.imageURL || item.img,
          desc: item.description || item.desc
        }));
        setPlaces(mappedData);
      } catch (err) {
        console.error('Error fetching places:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  // 🗺️ OPEN GOOGLE MAPS
  const openMap = (placeName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      placeName
    )}`;
    window.open(url, "_blank");
  };

  // 🌍 FETCH INFO FROM WIKIPEDIA
  const fetchInfo = async (placeName) => {
    setSelectedPlace(placeName);
    setLoading(true);
    setInfo("");

    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          placeName
        )}`
      );

      const data = await res.json();
      setInfo(data.extract || "No information found for this place.");
    } catch (err) {
      setInfo("Failed to load information.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-earth-900 min-h-screen text-white">
      {/* HERO */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/8f/fa/dc/8ffadce571b4f59fd0febc5ab2fba5eb.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 font-serif drop-shadow-2xl">
            Explore Ethiopia 🌍
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-earth-100/90 font-light drop-shadow-lg">
            Discover amazing landscapes, ancient culture, and profound history.
          </p>

          <button 
            onClick={scrollToSection} 
            className="group flex flex-col items-center mx-auto space-y-2 text-white/80 hover:text-white transition-all duration-300"
          >
            <span className="px-8 py-3 bg-[#682424] hover:bg-[#823030] rounded-full font-semibold shadow-xl transition-all">
              Start Exploring
            </span>
            <ArrowDown className="animate-bounce mt-4 h-6 w-6" />
          </button>
        </div>
      </section>

      {/* SECTION */}
      <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-gold-400">Top Places</h2>
          
          {/* SEARCH */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-earth-400" />
            </div>
            <input
              placeholder="Search hidden gems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-earth-800/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all text-white placeholder-earth-500"
            />
          </div>
        </div>

        {/* INFO BOX */}
        {selectedPlace && (
          <div className="mb-16 bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info className="h-24 w-24 text-forest-700" />
            </div>
            <h3 className="text-3xl font-bold text-forest-700 mb-6 font-serif border-b pb-4 border-earth-100">{selectedPlace}</h3>
            {loading ? (
              <div className="flex items-center space-x-3 text-earth-600">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-forest-500 border-t-transparent"></div>
                <p>Consulting the archives...</p>
              </div>
            ) : (
              <p className="text-lg text-earth-800 leading-relaxed font-sans">{info}</p>
            )}
            <button 
              onClick={() => setSelectedPlace("")}
              className="mt-8 text-sm font-bold text-terra-500 hover:text-terra-600 transition-colors uppercase tracking-widest"
            >
              Close info
            </button>
          </div>
        )}

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {places
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((place, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-500/10 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={place.img} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button 
                    onClick={() => toggleFavorite(index)}
                    className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                  >
                    <Heart className={`h-6 w-6 ${favorites.includes(index) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <h3
                    className="text-2xl font-serif font-bold text-earth-900 mb-3 cursor-pointer hover:text-forest-600 transition-colors flex items-center group/title"
                    onClick={() => fetchInfo(place.name)}
                  >
                    {place.name}
                    <Info className="h-4 w-4 ml-2 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-earth-600 text-sm leading-relaxed mb-8 flex-grow">
                    {place.desc}
                  </p>

                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => openMap(place.name)} 
                      className="w-full py-3 rounded-xl bg-forest-600 text-white font-bold flex items-center justify-center space-x-2 hover:bg-forest-700 transition-all shadow-lg hover:shadow-forest-500/20"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>View on Map</span>
                    </button>
                    
                    <button
                      onClick={() => toggleFavorite(index)}
                      className={`w-full py-3 rounded-xl border-2 font-bold transition-all ${
                        favorites.includes(index) 
                          ? 'border-red-500 text-red-500 bg-red-50' 
                          : 'border-earth-100 text-black hover:border-[#682424] hover:text-[#682424]'
                      }`}
                    >
                      {favorites.includes(index) ? "❤️ Favorited" : "🤍 Add to Favorites"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {places.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="text-center py-20 bg-earth-800/30 rounded-3xl border border-white/5">
            <p className="text-xl text-earth-400">No destinations match your search. Try another path!</p>
          </div>
        )}
      </section>
    </div>
  );
}
