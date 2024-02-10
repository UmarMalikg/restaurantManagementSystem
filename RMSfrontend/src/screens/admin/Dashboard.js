import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import adminStyles from "./styles/style";
import RecordOverview from "./components/RecordOverview";
import SalesDetail from "./components/SalesDetail";
import OrderChart from "./components/OrderChart";
import RevenueDetail from "./components/RevenueDetail";
import { connect } from "react-redux";
import { totalEmployees } from "../../redux/actions/employeeActions";
import { totalProducts } from "../../redux/actions/productAction";

const Dashboard = ({
  totalEmployees,
  totalEmployeesCount,
  totalProducts,
  totalProductsCount,
}) => {
  useEffect(() => {
    // Fetch total employees when the component mounts
    totalEmployees();
    totalProducts();
  }, [totalEmployees, totalProducts]);
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
            recordNums={17}
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
          <SalesDetail />
          <RevenueDetail />
          <OrderChart />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => ({
  totalProductsCount: state.products.totalProductsCount,
  totalEmployeesCount: state.employees.totalEmployeesCount, // Map totalEmployeesCount from Redux state to props
});
const mapDispatchToProps = {
  totalEmployees,
  totalProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
