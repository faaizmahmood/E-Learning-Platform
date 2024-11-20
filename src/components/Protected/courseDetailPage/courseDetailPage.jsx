/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './courseDetailPage.module.scss'
import video from '../../../../public/videos/API_Video.mp4'
import useCourseDetailPage from './useCourseDetailPage'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import thumbnail from '../../../../public/images/course_thumbail_1.png'
import pf from '../../../../public/images/profileImg.png'
import InnerPageLoading from '../../../containers/pageLoading/InnerPageLoading/innerPageLoading'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const CourseDetailPage = () => {

    const colors = ['#0071dc', '#262626', '#a6a6a6', '#a6a6a6'];

    const { loading, currentTime, handleTimeUpdate, handleLoadedMetadata, duration, courseProgress, boom, enableButton, course, videoRef, courseID, saveCourse } = useCourseDetailPage()

    const navigate = useNavigate()

    const currentUser = useSelector((state) => state.set_up_user)


    const location = useLocation()

    const currentUrl = `${window.location.origin}${location?.pathname}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success('URL copied to clipboard!');
            })
            .catch((err) => {
                toast.error('Failed to copy URL');
            });
    };


    return (
        <>

            {
                loading ? (
                    <>
                        <InnerPageLoading />
                    </>
                ) : (
                    <>

                        <main className={`${styles.course_detail_page}`}>
                            <div className='row'>

                                <div className='col-8'>
                                    <video
                                        ref={videoRef}
                                        controls="controls"
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        poster={thumbnail}
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                    <div className={`${styles.course_meta_data} d-flex justify-content-between align-items-center`}>
                                        <h3 className='mt-3'>{course?.title}</h3>
                                        {enableButton ? <button onClick={() => {
                                            navigate(`/quiz/${courseID}/?source=course&course_title=${course?.title}`, { state: { course_source: "course" } })
                                        }}>Got To Quiz</button> : ""}
                                    </div>

                                    <div className={`${styles.instructor_detail} mt-4`}>

                                        <div className='row align-items-center'>
                                            <div className='col-6 d-flex gap-4 align-items-center'>
                                                <img src={pf} alt='...' className='img-fluid' />
                                                <div className='mt-2'>
                                                    <h4>{course?.instructor?.name}</h4>
                                                    <p>{course?.instructor?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='col-6 d-flex gap-3 justify-content-end'>

                                                {currentUser?.wishlist.includes(courseID) ? (
                                                    <>
                                                    <i className="fa-solid fa-bookmark" onClick={()=>saveCourse("remove")}></i>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fa-regular fa-bookmark" onClick={()=>saveCourse("add")}></i>
                                                    </>
                                                )
                                                }

                                                <Popup trigger={<i className="fa-regular fa-share-nodes"></i>} modal >
                                                    <div className={`${styles.share_model} d-flex flex-column justify-content-center align-items-center`} style={{ height: '30vh', borderRadius: '20px', padding: '20px' }}>
                                                        <div className={`${styles.link_div}`}>{currentUrl}</div>
                                                        <button className='mt-3' onClick={handleCopy}>Copy URL</button>
                                                    </div>
                                                </Popup>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={`${styles.course_details} mt-4`}>

                                        <h3>About This Course</h3>

                                        <p>{course?.description}</p>

                                        <h3 className='mt-5'>Review For This Course</h3>

                                        <div className={`${styles.reviews} mt-4`}>

                                            {course?.ratings?.reviews.map((ele) => {
                                                return (
                                                    <>
                                                        <div className={`${styles.review_card} mt-3`}>
                                                            <div className='d-flex gap-2'>
                                                                {[...Array(ele?.rating)].map((_, ind) => {
                                                                    return (
                                                                        <>
                                                                            <i key={ind} className="fa-solid fa-star" style={{ color: '#FFD700' }}></i>
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>

                                                            <h6 className='mt-3'>{ele?.comment}</h6>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>

                                    </div>
                                </div>

                                <div className='col-4'>
                                    <div className={`${styles.course_progress}`}>
                                        <h3>Your Study Progress <span className='ms-1'>{courseProgress ? courseProgress : "0"}%</span></h3>

                                        <div className={`${styles.progress_bar} mt-3`}>
                                            <div className={`${styles.progress_points} ${styles.progress_points_1} ${courseProgress >= 25 ? styles.active : ""}`} style={{ width: courseProgress >= 25 ? "28%" : "" }}></div>
                                            <div className={`${styles.progress_points} ${styles.progress_points_2} ${courseProgress >= 50 ? styles.active : ""}`} style={{ width: courseProgress >= 50 ? "30%" : "" }}></div>
                                            <div className={`${styles.progress_points} ${styles.progress_points_3} ${courseProgress >= 75 ? styles.active : ""}`} style={{ width: courseProgress >= 75 ? "30%" : "" }}></div>
                                            <div className={`${styles.progress_points} ${styles.progress_points_4} ${courseProgress >= 100 ? styles.active : ""}`} style={{ width: courseProgress >= 100 ? "30%" : "" }}></div>
                                            <div className={`${styles.progress_points} ${styles.progress_points_5}`}></div>
                                        </div>

                                        <div className={`${styles.messgae_for_user} mt-4`}>
                                            <p>Graet Job!🎉 You&apos;re on the path to getting a certified of {course?.title}. Your dedication to learning is impreseive. Finish Strong!</p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </main>


                    </>
                )
            }



        </>
    )
}

export default CourseDetailPage