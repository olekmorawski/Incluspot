const Statistic = ({ number, title }) => {
  return (
    <div className="statistic">
      <h1 className="number">{number}</h1>
      <p className="stat_name">{title}</p>
      <p className="stat_desc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
        sapiente.
      </p>
    </div>
  );
};

export default Statistic;
