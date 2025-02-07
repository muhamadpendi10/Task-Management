const TaskSubmit = ({ options }) => {
  return (
    <>
      <input
        type="submit"
        className="m-auto bg-primary-color text-xl font-bold text-white rounded-xl py-2 px-4 shadow-[0_0_10px_0_black] cursor-pointer hover:bg-white hover:text-primary-color"
        {...options}
      />
    </>
  );
};

export default TaskSubmit;
