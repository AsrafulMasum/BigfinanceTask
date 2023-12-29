import useLoadPublicData from "../Hooks/useLoadPublicData";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Players = () => {
  const playersURL = "/players";
  const { data: players } = useLoadPublicData(playersURL);

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
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Country</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {players?.map((player, idx) => (
                <tr key={player?._id}>
                  <th>{idx + 1}</th>
                  <td>
                    {player?.name}
                  </td>
                  <td>
                    {player?.country}
                  </td>
                  <td>{player?.score}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs"><FaEdit className="text-lg"></FaEdit></button>
                  </th>
                  <th>
                    <button className="btn btn-ghost btn-xs"><MdDelete className="text-lg text-red-500"></MdDelete></button>
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
