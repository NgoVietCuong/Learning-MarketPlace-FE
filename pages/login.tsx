import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const Login = () => {
  return (
    <div className="w-full grow bg-white-primary">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[60%] bg-slate-90 flex flex-col items-center justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Heading className="text-center">Login</Heading>
            <Input type="email" id="email" placeholder="Enter your email" />
            <Input type="password" id="password" placeholder="Enter your password" />
            <Button>Login</Button>

            <div className="flex items-center">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="px-3 text-gray-500 bg-white">or Login with</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;