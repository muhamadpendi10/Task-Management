import useLabel from '../../hooks/useLabel';

const DateTimeLocal = ({ settings, options }) => {
  const [label, labelID] = useLabel(
    settings.name,
    settings.createEditField.title,
    'font-bold text-md'
  );

  return (
    <div>
      {label}
      <input
        className="block w-[100%] p-2 rounded cursor-pointer"
        type="datetime-local"
        id={labelID}
        {...options}
      />
    </div>
  );
};

export default DateTimeLocal;
