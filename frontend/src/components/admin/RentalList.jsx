const RentalList = () => {
  const rentals = [
    {
      id: 1,
      car: "Nissan GT-R",
      type: "Sport Car",
      renter: "John Doe",
      owner: "Jane Smith",
      pickUp: "Kota Semarang",
      dropOff: "Kota Semarang",
      date: "20 July 2022",
      price: "$80.00",
    },
    {
      id: 2,
      car: "Koenigsegg",
      type: "Sport Car",
      renter: "Alice Brown",
      owner: "Bob Wilson",
      pickUp: "Jakarta",
      dropOff: "Jakarta",
      date: "19 July 2022",
      price: "$99.00",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Rental List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Car</th>
            <th className="p-2">Type</th>
            <th className="p-2">Renter</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Pick-Up</th>
            <th className="p-2">Drop-Off</th>
            <th className="p-2">Date</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id} className="border-b">
              <td className="p-2">{rental.car}</td>
              <td className="p-2">{rental.type}</td>
              <td className="p-2">{rental.renter}</td>
              <td className="p-2">{rental.owner}</td>
              <td className="p-2">{rental.pickUp}</td>
              <td className="p-2">{rental.dropOff}</td>
              <td className="p-2">{rental.date}</td>
              <td className="p-2">{rental.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalList;
