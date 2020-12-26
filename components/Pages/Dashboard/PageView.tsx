import { ReactElement } from "react";
import IconLoader from "../../Ui/loader/IconLoader";
import DashboardHeader from "./DashboardHeader";

export default function PageView(): ReactElement {
    return <div className={'content'}>
        <DashboardHeader />


        <div className={'loader'}>
            <IconLoader />

            <div className={'label'}>
                Waiting for Game...
            </div>
        </div>

        <style jsx>{`
            .content {
                padding-top: 60px;
                height: 100vh;
                display: flex;
                align-items: stretch;
            }
            .loader {
                height: 200px;
                width: 200px;
                margin: -1rem auto 0 auto;
                align-self: center;
                text-align: center;
            }    

            .label {
                margin-top: 1rem;
            }
        `}</style>
    </div>
}