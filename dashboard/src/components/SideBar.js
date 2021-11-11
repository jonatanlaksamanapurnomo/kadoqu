import React from "react";
import * as router from "react-router-dom";
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import navigation from "../data/navigation";

class SideBar extends React.Component {
  render() {
    const navConfig = navigation(this.props.isAdmin);
    return (
      <AppSidebar fixed display="lg">
        <AppSidebarHeader />
        <AppSidebarForm />
        <AppSidebarNav navConfig={navConfig} {...this.props} router={router} />
        <AppSidebarFooter />
        <AppSidebarMinimizer />
      </AppSidebar>
    );
  }
}

export default router.withRouter(SideBar);
