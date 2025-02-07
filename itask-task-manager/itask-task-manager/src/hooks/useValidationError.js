const useValidationError = (validationErrors) => {
  if (validationErrors.length > 0) {
    return (
      <div className="flex flex-col text-red-500 font-bold">
        {validationErrors.map((err, index) => (
          <span key={index}>*{err}</span>
        ))}
      </div>
    );
  }
  return null;
};

export default useValidationError;
