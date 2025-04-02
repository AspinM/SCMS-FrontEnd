import React from 'react';
import style from './loader.module.css';

function page() {
    return (
        <div>
            <div className={style.loadercontainer}>
                <div className={style.loader}></div>
            </div>
        </div>
    )
}

export default page
