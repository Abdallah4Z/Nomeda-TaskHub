import React from 'react';
import NavigationDrawer from '../components/NavigationDrawer';
function Homepage(){    
    return (
        
        <div>
        <style jsx global="true">{`
            html, body, #__next {
                background-color: #212529 !important;
                margin: 0;
                padding: 0;
                height: 100%;
            }
        `}</style>
            <NavigationDrawer/>
            <h1>Welcome to the Homepage</h1>
        </div>
    )
}
export default Homepage;