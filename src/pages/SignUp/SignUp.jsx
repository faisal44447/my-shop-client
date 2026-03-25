import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiRead } from "react-icons/ci";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL);
        Swal.fire("Signup success!");
        reset();
        navigate("/");
      })
      .catch((err) => Swal.fire(err.message));
  };

  return (
    <div className="hero min-h-screen">
      <div className="card w-96 shadow-xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

          <input {...register("name")} placeholder="Name" className="input input-bordered" />
          <input {...register("photoURL")} placeholder="Photo URL" className="input input-bordered" />
          <input {...register("email")} placeholder="Email" className="input input-bordered" />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              <CiRead />
            </span>
          </div>

          <Link to="/login" className="text-sm text-blue-500">
            Already have account?
          </Link>

          <button className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;