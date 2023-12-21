import "../Play.css";

const AnswerBtn = ({children, onClick, className}) => {
  return (
    <div className={`answer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default AnswerBtn;
