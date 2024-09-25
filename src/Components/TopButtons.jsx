import React from "react";

const TopButtons=({ setQuery })=>{
  const cities = [
    {
      id: 1,
      title: "Alaska",
    },
    {
      id: 2,
      title: "Chennai",
    },
    {
      id: 3,
      title: "Durban",
    },
    {
      id: 4,
      title: "Hyderabad",
    },
    {
      id: 5,
      title: "Kyoto",
    },
    {
      id: 6,
      title: "Leh",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className= "text-white text-lg font-medium hover:bg-gray-900/20 px-2 py-2 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;