'use client'

import React, { useState } from 'react'
import style from './welcome.module.css';
import bottomimg from '../../../SetldImages/bottom.png'
import Image from 'next/image';
import iphoneimag from '../../../SetldImages/iPhone.png';
import groupimg from '../../../SetldImages/groupimg.png';
import tabbottomimg from '../../../SetldImages/tabbottom.png'

import righticon from '../../../SetldImages/Icon Right.svg'
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Loader from '../../../Loader/page';
import startratingimg from '../../../SetldImages/starratingimg.png';

// import withAuth from '../../TokenSetup/withAuth';

function Page() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getstart = (e) => {
    e.preventDefault();
    setLoading(true)
      router.push('/Components/OnBoardingScreen/Information'); // Replace '/signup' with the actual route of your signup page
  }

  return (
    <div className={style.welcomemain}>
      {loading && <Loader />}
      <div>
        <div className={style.welcometotxt}> WELCOME TO SETLD</div>
        <div className={style.starttxt}>
          Start Your Settlement <br></br>
          With Us.<span className={`${style.groupimg} `}>
            <Image
              src={groupimg}
              alt="Picture "
              width={100}
              height={50}
            />
          </span>
        </div>
        <div className={style.iponeimage}>
          <Image
            src={iphoneimag}
            alt="Picture "
            className={style.iphoneimg}
          />
        </div>
        <p className={style.welcometxt}>
          Lorem ipsum dolor sit amet consectetur. At integer odio eget lacus nibh purus <br></br> viverra quam. Nunc iaculis dui sem tellus praesent vestibulum. Tristique venenatis  <br></br> cursus facilisis integer consectetur in urna metus.
        </p>

        <button className={style.getstartbut} onClick={getstart}>
          Get Started  <Image
            src={righticon}
            alt="Picture "
          />
        </button>

        <div className={`d-none d-md-block ${style.bottomimg} col-lg-9 d-flex align-items-end`}>
          <div className={`row`}>
            <div className={`col-lg-6 col-md-12 `}>
              <div className={`row ${style.dealcount}`}>
                <div className={`col-lg-4 col-md-4 d-flex justify-content-center ${style.lendertxt}`}>
                  <div>
                    <h2 className='d-flex justify-content-center'>4+</h2>
                    <div>Deals</div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-4 d-flex justify-content-center ${style.lendertxt}`}>
                  <div>
                    <h2 className='d-flex justify-content-center'>5+</h2>
                    <div>Borrowers</div>
                  </div>
                </div>
                <div className={`col-lg-4 col-md-4 d-flex justify-content-center ${style.lender}`}>
                  <div>
                    <h2 className='d-flex justify-content-center'>6+</h2>
                    <div>Lender</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-lg-6 col-md-12 d-flex align-items-center`}>
              <div className={`d-flex flex-column flex-md-row gap-4`}>
                <div className='mt-5 ml-md-5 ml-5'>
                  <Image
                    src={groupimg}
                    alt="Picture"

                  />
                </div>
                <div className='mt-5'>
                  <div className={`text-light ${style.manypeopletxt}`}>
                    Many people like <br />
                    this Services.
                  </div>
                  <div className="d-flex mt-1">
                    <Image
                      src={startratingimg}
                      alt="Star"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={startratingimg}
                      alt="Star"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={startratingimg}
                      alt="Star"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={startratingimg}
                      alt="Star"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={startratingimg}
                      alt="Star"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page;
// export default withAuth(Page);

