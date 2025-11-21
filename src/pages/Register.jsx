import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";
import logo from "../assets/cognifyz.png";

const Register = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data) => {
    try {
      const finalData = {
        ...data,
        isAdmin: false,
        role: "user",
        title: "Employee",
      };

      const res = await registerUser(finalData).unwrap();
      dispatch(setCredentials(res));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 p-4 relative overflow-hidden">
      
      {/* Floating Shapes (light theme) */}
      <div className="absolute top-10 left-16 w-40 h-40 bg-blue-400/10 backdrop-blur-2xl rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-400/10 backdrop-blur-2xl rounded-full blur-3xl animate-ping"></div>

      <div className="w-full md:w-auto flex flex-col lg:flex-row items-center justify-center z-10 gap-10">
        
        {/* Left Section */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center text-gray-900 drop-shadow-xl">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-6 md:gap-y-10">
            <span className="py-1 px-4 border rounded-full text-sm md:text-base border-gray-400/50 backdrop-blur-md bg-white/70 text-gray-900">
              Create your account today!
            </span>

            <p className="flex flex-col text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-gray-900">
              <span>Taskifyz</span>
              <span className="text-blue-600">Task Manager</span>
            </p>

            <div className="w-24 drop-shadow-xl">
              <img src={logo} alt="company-logo" className="rounded-xl" />
            </div>
          </div>
        </div>

        {/* Glassy Register Card */}
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full md:w-[500px] flex flex-col gap-y-8 rounded-3xl p-14 bg-white/10  backdrop-blur-2xl border border-gray-300 shadow-[0_8px_32px_rgba(31,38,135,0.2)]"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center drop-shadow-sm">
                Create Account
              </p>
              <p className="text-center text-base text-gray-700">
                Sign up to manage all your tasks!
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Your Name"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full bg-white/70 border border-gray-200 text-black placeholder-gray-300 backdrop-blur-md md:w-full"
                register={register("name", { required: "Name is required!" })}
                error={errors.name ? errors.name.message : ""}
              />

              <Textbox
                placeholder="you@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full bg-white/70 border border-gray-200 text-black placeholder-gray-300 backdrop-blur-md"
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />

              <Textbox
                placeholder="password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full bg-white/70 border border-gray-200 text-black placeholder-gray-300 backdrop-blur-md"
                register={register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password ? errors.password.message : ""}
              />
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Register"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
              />
            )}

            <div className="text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link to="/log-in" className="text-blue-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;
