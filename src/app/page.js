const page = async () => {
  const res = await fetch(
    "https://nextjs-orpin-omega-98.vercel.app/api/restaurants"
  );
  const restaurants = await res.json();
  console.log(restaurants);

  const groupRestaurantsBystate = () => {
    const groupedRestaurants = {};

    restaurants.forEach((restaurant) => {
      const { state, restaurant_name } = restaurant;

      if (!groupedRestaurants[state]) {
        groupedRestaurants[state] = [];
      }

      groupedRestaurants[state].push(restaurant_name);
    });

    return groupedRestaurants;
  };

  const groupedRestaurants = groupRestaurantsBystate();

  console.log(groupedRestaurants);

  return (
    <section className="container mx-auto my-20 px-4">
      <h2 className="text-2xl md:text-5xl font-bold text-center my-4 text-slate-950 hover:text-slate-800">Restaurant List:</h2>
      {Object.keys(groupedRestaurants).map((location, index) => (
        <div key={index}>
          <li className="text-xl md:text-3xl text-black font-bold my-6 list-disc">{location}:</li>
          <ul>
            {groupedRestaurants[location].map((restaurant, index) => (
              <li className="list-disc ml-10 md:ml-20 my-2" key={index}>{restaurant}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default page;
