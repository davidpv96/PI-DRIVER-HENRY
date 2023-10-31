import Card from "../Card/Card";


const Cards = (props) => {
  const { drivers } = props;
console.log(drivers)
 return (
  <div>
    {drivers.map((driver) => (
      <div key={driver.id}>
        <Card
          
          id={driver.id}
          name={driver.name.forename}
          image={driver.image.url}
          teams={driver.teams}
          
        />
      </div>
    ))}
  </div>
);
}

export default Cards;