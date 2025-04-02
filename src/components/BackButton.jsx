import { ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backArrow from '../assets/back_arrow.svg';

const BackButton = () => {
    const navigate = useNavigate();
    
        const prev = () => {
            setTimeout(() => {
                navigate(-1)
            }, 350);
        };

    return (
        <div className="button">
            <ButtonBase className="back-button" onClick={prev} >
                <img src={backArrow} alt="Back" />
            </ButtonBase>
        </div>
  )
}

export default BackButton
