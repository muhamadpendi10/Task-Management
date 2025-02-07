import '../../assets/styles/Input.scss';

const LoginInput = ({ props, msg = [] }) =>  (
    <div className="w-[100%]">
      <input
        {...props}
        className={`login-simple-input ${msg.length && '!border-red-500'}`}
      />
      {msg.length > 0
        ? msg.map((item, index) => (
            <span
              key={index}
              className="block text-sm capitalize text-red-500 font-bold"
            >
              {item}
            </span>
          ))
        : null}
    </div>
  );


export default LoginInput;
