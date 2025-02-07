import useLabel from '../../hooks/useLabel';

const SelectOption = ({ options = {}, stateOptions = {} }) => {
  const label = useLabel(
    options.settings.name,
    options.settings.createEditField.title,
    'font-bold text-md'
  );
  const list = options.settings.list ?? [];
  if (list.length < 1) return <span>no options</span>;
  const settings = options.settings;
  const title = settings.createEditField.title;
  const makeOption = (options, value) => {
    return <option {...options}>{value}</option>;
  };
  return (
    <div className="flex flex-col">
      {label[0]}
      <select
        id={label[1]}
        name={settings.name}
        className="p-2 rounded cursor-pointer"
        {...stateOptions}
      >
        {makeOption(
          { value: 'default_' + settings.name, disabled: true },
          title
        )}
        {list.map((option, index) =>
          makeOption({ key: index, value: option.name }, option.value)
        )}
      </select>
    </div>
  );
};

export default SelectOption;
