import { useSelector } from 'react-redux'
import styles from './sidebar.module.scss'

const Sidebar = () => {

    const currentUser = useSelector((state)=> state.set_up_user)

    return (
        <aside className={`${styles.side_overview}`}>

            <div className={`${styles.profile_overview}`}>
                <h5>Statistic</h5>
                <div className='text-center d-flex justify-content-center'>
                    <div className={`${styles.pf} my-3`}>
                        <div className={`${styles.progress_count}`}>
                            {'32'}%
                        </div>
                        <div className={`${styles.progress_track}`}></div>
                        <img src='./images/PF_img_main.png' style={{width:'120px'}}/>

                    </div>
                </div>
                <div className='d-flex align-items-center flex-column mt-3'>
                <h5>Good Morning {currentUser?.fName}</h5>
                    <p className='w-75 text-center'>Continue your learning to achive your target!</p>
                </div>
            </div>

        </aside>
    )
}

export default Sidebar