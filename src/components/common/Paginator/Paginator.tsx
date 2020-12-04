import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

export let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize,
                                          currentPage = 1,
                                          onPageChanged = x => x,
                                          portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={styles.paginator}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <span className={ cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


    </div>
}

// import React from 'react'
// import styles from "./Paginator.module.css";
//
// type PaginatorPropsType = {
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     onPageChanged: (pageNumber: number) => void
// }
//
// export let Paginator = (props: PaginatorPropsType) => {
//
//     let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
//     let pages = [];
//
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }
//
//     return <div>
//         {pages.map(p => {
//             return <span className={props.currentPage === p ? styles.selectedPage : ""} onClick={() => {
//                 props.onPageChanged(p)
//             }}>{p} </span>
//         })}
//     </div>
// }