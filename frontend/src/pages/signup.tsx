import { Quote } from "../components/quote"
import { Auth } from "./auth"

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-screen">
        
          <Auth type="signup"/>
          <div className="invisible lg:visible">

          <Quote />
          </div>
    </div>
  )
}