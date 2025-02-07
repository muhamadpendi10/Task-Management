import useLabel from '../../hooks/useLabel';
import useValidationError from '../../hooks/useValidationError';

const TaskInput = ({ settings, options, validationErrors }) => {
  const validation = useValidationError(validationErrors);
  const label = useLabel(
    settings.name,
    settings.createEditField.title,
    'font-bold text-md'
  );
  return (
    <div className="flex flex-col">
      {label[0]}
      {settings.createEditField.type === 'text' ? (
        <input
          className="p-2 rounded focus:shadow-primary-custom"
          {...options}
          id={label[1]}
        />
      ) : (
        <textarea
          className="p-2 rounded focus:shadow-primary-custom"
          id={label[1]}
          {...options}
        ></textarea>
      )}

      {validation}
    </div>
  );
};

export default TaskInput;
