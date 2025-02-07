const TaskListTable = ({ children }) => {
  return (
    <div className="w-[100%] overflow-x-scroll">
      <table className="w-[100%] [&>*>tr]:h-[40px] [&>*>*>td]:min-h-[40px]">
        {children}
      </table>
    </div>
  );
};

export default TaskListTable;
