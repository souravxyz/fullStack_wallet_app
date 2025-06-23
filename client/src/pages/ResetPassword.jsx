// pages/ResetPassword.jsx
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import endpoints from "../api/endpoints";

export  function ResetPassword() {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await apiHandler.post(endpoints.auth.resetPassword(token), data);
      toast.success("Password updated successfully.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          {...register("password", { required: true, minLength: 6 })}
          className="w-full border px-3 py-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
