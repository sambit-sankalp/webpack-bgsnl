import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom';
import { REGIONS } from '../../util/REGIONS_DESIGN';
import styles from './RegionLayout.module.css'

const RegionParamRoute = ({ component: Component, ...rest }) => {
    const region = useLocation().pathname.split('/')[1]

    return REGIONS.includes(region) ? <Route
    {...rest}
    render={(props) => (
        <div className={styles[region] || ''}> 
            <Component {...props} />
        </div>
    )}
/> : <Navigate to="/404" />
}

export default RegionParamRoute
