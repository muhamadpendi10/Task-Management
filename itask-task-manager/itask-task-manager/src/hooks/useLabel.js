const useLabel = (name, value, classes) => {
  const generateID = name + '_' + Math.floor(Math.random() * 20);
  return [
    <label htmlFor={generateID} className={classes}>
      {value}
    </label>,
    generateID,
  ];
};

export default useLabel;
