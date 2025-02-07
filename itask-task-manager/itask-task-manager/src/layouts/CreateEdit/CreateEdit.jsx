const CreateEdit = (props) => {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl text-center cursor-default bg-sec-color text-white shadow-[0_0_10px_0_black] py-1 mb-3">
        {props.header}
      </h1>
      <div className="form">
        <form className="flex flex-col gap-3">{props.children}</form>
      </div>
    </div>
  );
};

export default CreateEdit;
