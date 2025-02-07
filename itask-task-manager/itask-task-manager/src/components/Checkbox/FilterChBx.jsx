import useLabel from '../../hooks/useLabel';

const FilterChBx = ({ labelName, value, checked, onClick }) => {
  const [label, labelID] = useLabel(value, labelName, '');
  return (
    <div>
      <input
        type="checkbox"
        id={labelID}
        name={labelID}
        defaultChecked={checked}
        value={value}
        onChange={onClick}
        className="mr-2"
      />
      {label}
    </div>
  );
};

export default FilterChBx;
