import Image from "next/image";
import SignIn from './Components/OnBoardingScreen/SignIn/page'

import SignUp from './Components/OnBoardingScreen/SignUp/page'


export default function Home() {
  return (
    <div>
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}
