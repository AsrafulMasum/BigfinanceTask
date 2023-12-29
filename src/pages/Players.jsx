import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useLoadPublicData from "../Hooks/useLoadPublicData";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Players = () => {

  const [showData, setShowData] = useState([])

  const playersURL = "/players";
  const { data: players, refetch } = useLoadPublicData(playersURL);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()

  useEffect(()=>{
    setShowData(players)
  }, [players])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    const rank = form.searchText.value
    const res = await axiosPublic(`/players/rank/${rank}`)
    const player = [res?.data]
    setShowData(player)
    form.reset()
  };

  const handleRandom = async () => {
    const res = await axiosPublic("/players/random")
    const player = [res?.data]
    setShowData(player)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/players/${id}`);
        if (res?.data?.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Player has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="bg-gray-800 pb-10">
      <div className="h-[50vh] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://i.postimg.cc/x8D7qNhX/players-Page.jpg"
          alt="Banner"
        />
      </div>

      <LayoutContainer>
        <h2 className="text-center my-10 text-3xl border-b-8 pb-4">Players</h2>
        <div className="text-center my-10">
          <form
            className="w-2/3 mx-auto flex justify-center items-center my-10"
            onSubmit={handleSubmit}
          >
            <input
              className="flex-1 h-10 focus:outline-none pl-10 rounded-l bg-gray-600 text-white placeholder:text-white"
              placeholder="Search via rank..."
              type="number"
              name="searchText"
            />
            <input
              className="bg-green-700 h-10 px-4 rounded-r text-white cursor-pointer"
              type="submit"
              value="Search"
            />
          </form>
          <button onClick={handleRandom} className="btn btn-wide bg-[#1D84B5] text-white">Random</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Country</th>
                <th>Score</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {showData?.map((player, idx) => (
                <tr key={player?._id}>
                  <th>{idx + 1}</th>
                  <td>{player?.name}</td>
                  <td>{player?.country}</td>
                  <td>{player?.score}</td>
                  <th>
                    <Link
                      to={`/updatePlayer/${player?._id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaEdit className="text-lg text-yellow-500"></FaEdit>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(player?._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <MdDelete className="text-lg text-red-500"></MdDelete>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Players;
