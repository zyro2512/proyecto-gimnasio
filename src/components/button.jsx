import MemberCreate from "./memberCreate";


const Button = () => {
    function handleClick() {
        <MemberCreate />;
       
    }

    return (
        <button onClick={handleClick}>
        Agregar Miembro
      </button>
      
    );
  }



export default Button;