import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useLoadSecureData from "../Hooks/useLoadSecureData";
import { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdatePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const playerURL = `/players/${id}`;
  const { data: player } = useLoadSecureData(playerURL);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("name", player?.name);
    setValue("country", player?.country);
    setValue("score", player?.score);
  }, [player, setValue]);

  const onSubmit = async (data) => {
    const playerInfo = {
      name: data?.name,
      country: data?.country,
      score: data?.score,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update the player info!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/players/${id}`, playerInfo);
        if (res?.data?.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Player info has been updated.",
            icon: "success",
          });
          navigate("/players");
        }
      }
    });
  };

  return (
    <div className="pt-24 bg-gray-800 min-h-screen">
      <h2 className="text-3xl text-center my-10">Update Players Info</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            defaultValue={player?.name}
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("country", { required: true })}
            type="text"
            id="country"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="country"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("score", { required: true })}
            type="text"
            id="score"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="score"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Score
          </label>
        </div>

        <button
          type="submit"
          className="btn w-full text-white bg-[#1D84B5] hover:bg-green-600 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePlayer;
