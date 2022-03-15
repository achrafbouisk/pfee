import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import Chart from "./Chart";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/api/v1/admin/income");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Months Sales": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard | Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="featured">
          <div className="featuredItem">
            <span className="featuredTitle">Total Amount</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{totalAmount} MAD</span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Products</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {products && products.length} <BarChartIcon />
              </span>
            </div>
            <Link to="/admin/products">
              <span className="featuredSub">View Products</span>
            </Link>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Orders</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {orders && orders.length} <ShoppingCartIcon />
              </span>
            </div>
            <Link to="/admin/orders">
              <span className="featuredSub">View Orders</span>
            </Link>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Users</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {users && users.length} <GroupIcon />
              </span>
            </div>
            <Link to="/admin/users">
              <span className="featuredSub">View Users</span>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Chart
            data={userStats}
            title="Sales Analytics"
            grid
            dataKey="Months Sales"
          />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
