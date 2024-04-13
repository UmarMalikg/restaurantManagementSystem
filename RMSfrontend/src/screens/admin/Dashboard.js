import { ScrollView, View } from "react-native";
import React, { useEffect, useContext } from "react";
import adminStyles from "../styles/adminStyles";
import RecordOverview from "./components/RecordOverview";
import SalesDetail from "./components/SalesDetail";
import OrderChart from "./components/OrderChart";
import RevenueDetail from "./components/RevenueDetail";
import { connect } from "react-redux";
import { totalEmployees } from "../../redux/actions/employeeActions";
import { totalProducts } from "../../redux/actions/productAction";
import { totalSales } from "../../redux/actions/orderActions";

import SocketContext from "../../context/socketContext";
import { changeViaSocket } from "../../socketConfig/socketFunctions";

import Loader from "../Loader";
import ErrorPage from "../ErrorPage";

const Dashboard = ({
  totalEmployees,
  totalEmployeesCount,
  totalProducts,
  totalProductsCount,
  totalSales,
  totalSalesCount,
  isLoading,
  isError,
}) => {
  useEffect(() => {
    // Fetch total employees when the component mounts
    totalEmployees();
    totalProducts();
    totalSales();
  }, [totalEmployees, totalProducts, totalSales]);

  const handleEmployeeChanged = () => {
    totalEmployees(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleProductChanged = () => {
    totalProducts(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  const handleOrderChanged = () => {
    totalSales(); // Wait for the data to be fetched
    console.log("Floor data fetched successfully");
  };
  useEffect(() => {
    changeViaSocket(socket, "employeeChanged", handleEmployeeChanged);
    changeViaSocket(socket, "productChanged", handleProductChanged);
    changeViaSocket(socket, "orderChanged", handleOrderChanged);
  }, [socket]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <View style={adminStyles.theScreen}>
      <ScrollView>
        <View style={adminStyles.recordOverview}>
          <RecordOverview
            recordName={`All Menus`}
            recordNums={totalProductsCount}
            bgColor={`#98BDFF`}
            link={`Products`}
          />
          <RecordOverview
            recordName={`Total Employess`}
            recordNums={totalEmployeesCount}
            bgColor={`#4b49ac`}
            link={`Employees`}
          />
          <RecordOverview
            recordName={`Total Sales`}
            recordNums={totalSalesCount}
            bgColor={`#7978e9`}
          />
          <RecordOverview
            recordName={`Revenue Generated`}
            recordNums={18}
            bgColor={`#f3797e`}
            recordIcon={require("../../../assets/images/Admin/dummy.jpg")}
          />
        </View>
        <View style={adminStyles.charts}>
          {/* <SalesDetail />
          <RevenueDetail />
          <OrderChart /> */}
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  totalEmployeesCount: state.employees.totalEmployeesCount, // Map totalEmployeesCount from Redux state to props
  totalProductsCount: state.products.totalProductsCount,
  totalSalesCount: state.orders.totalSalesCount,
  isLoading: state.loadingErrors.isLoading,
  isError: state.loadingErrors.isError,
});
const mapDispatchToProps = {
  totalEmployees,
  totalProducts,
  totalSales,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
