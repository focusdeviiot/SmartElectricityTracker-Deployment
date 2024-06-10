import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { IoMdLogIn } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "../../contexts/AlertContext";
import AsyncButton from "../../components/AsyncButton/AsyncButton";
import { MdElectricBolt } from "react-icons/md";

const Login = () => {
  const auth = useContext(AuthContext);
  const { showAlert } = useAlert();
  const [loading, setLoading] = React.useState(false);

  const schema = z
    .object({
      username: z
        .string()
        .regex(/^[a-zA-Z0-9]*$/, "Username must be alphanumeric")
        .min(1, "Username is required")
        .max(50, "Username must be less than 50 characters"),
      password: z
        .string()
        .min(1, "Password is required")
        .max(50, "Password must be less than 50 characters"),
    })
    .required();
  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormFields>(formOptions);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { username, password } = getValues();
      const resp = await login(username, password);
      if (resp.success) {
        auth?.setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("username", {
          type: "manual",
          message: resp.message,
        });

        setError("password", {
          type: "manual",
          message: resp.message,
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setError("username", {
          type: "manual",
          message: error.response.data.message,
        });

        setError("password", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        showAlert(error.message, "error");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-8 pt-10">
          <MdElectricBolt className="w-10 h-10" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4"> Smart Electricity Tracker</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-start">
                <label
                  className={`input input-bordered flex items-center gap-2  ${
                    errors.username?.message && "border-red-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    {...register("username")}
                    className="grow"
                    type="text"
                    placeholder="Username"
                    autoComplete="on"
                  />
                </label>
                {errors.username?.message && (
                  <p className="text-xs text-red-500 ml-1 mt-1">
                    {errors.username?.message.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start">
                <label
                  className={`input input-bordered flex items-center gap-2  ${
                    errors.username?.message && "border-red-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    {...register("password")}
                    type="password"
                    className={`grow ${
                      errors.password?.message && "border-red-500"
                    }`}
                    placeholder="Password"
                    autoComplete="on"
                  />
                </label>
                {errors.password?.message && (
                  <p className="text-xs text-red-500 ml-1 mt-1">
                    {errors.password?.message.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="card-actions flex justify-center pt-6">
              <AsyncButton title="Login" type="submit" loading={loading}>
                <IoMdLogIn className="h-4 w-4" /> Login
              </AsyncButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
