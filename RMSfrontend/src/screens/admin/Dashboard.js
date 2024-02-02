import { ScrollView, View } from "react-native";
import React from "react";
import adminStyles from "./styles/style";
import RecordOverview from "./components/RecordOverview";
import SalesDetail from "./components/SalesDetail";
import OrderChart from "./components/OrderChart";
import RevenueDetail from "./components/RevenueDetail";

const Dashboard = () => {
  return (
    <View style={adminStyles.theScreen}>
      <ScrollView>
        <View style={adminStyles.recordOverview}>
          <RecordOverview
            recordName={`All Menus`}
            recordNums={15}
            bgColor={`#98BDFF`}
            link={`Products`}
          />
          <RecordOverview
            recordName={`Total Employess`}
            recordNums={16}
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

export default Dashboard;
