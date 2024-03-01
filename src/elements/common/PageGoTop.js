import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const PageGoTop = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const unlisten = navigate.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return children;
};

export default PageGoTop;