import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useLoadPublicData from "../Hooks/useLoadPublicData";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Players = () => {
  const playersURL = "/players";
  const { data: players, refetch } = useLoadPublicData(playersURL);
  const axiosSecure = useAxiosSecure();

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
    <div>
      <div className="h-[50vh] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://i.postimg.cc/x8D7qNhX/players-Page.jpg"
          alt="Banner"
        />
      </div>

      <LayoutContainer>
        <h2 className="text-center my-10 text-3xl border-b-8 pb-4">Players</h2>
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
              {players?.map((player, idx) => (
                <tr key={player?._id}>
                  <th>{idx + 1}</th>
                  <td>{player?.name}</td>
                  <td>{player?.country}</td>
                  <td>{player?.score}</td>
                  <th>
                    <Link to={`/updatePlayer/${player?._id}`} className="btn btn-ghost btn-xs">
                      <FaEdit className="text-lg"></FaEdit>
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
