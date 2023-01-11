import { Navigate} from "react-router-dom";
const Protected = ({ isLoggedIn,isnotLoggedIn,admin, children}) => {
  if (!isLoggedIn && isnotLoggedIn ) {
        return <Navigate to="/"/>
  }

return children;


  
};
export default Protected;