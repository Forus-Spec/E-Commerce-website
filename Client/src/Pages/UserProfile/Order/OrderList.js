import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export default function OrderList() {
  // const ordersQuery = useQuery(["orders"], () => fetch("orders"));
  // const isLoading = issuesQuery.isLoading ? <p>Loading...</p> : undefined;

  return (
    <div>
      <h2>Orders List</h2>
      <ul>
        <li>
          {isLoading}
          {/* <Link to="/order/1">This is our Order 1</Link> */}
        </li>
      </ul>
    </div>
  );
}
