import { ReactElement } from "react";
import Dashboard from "../components/ConfigurationDashboard/Dashboard";
import PageFrame from "../components/PageFrame";

export default function ConfigurationDashboard(): ReactElement {
    return <PageFrame>
        <Dashboard />
    </PageFrame>;
}