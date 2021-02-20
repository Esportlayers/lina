import { ReactElement } from "react";
import { useRouter } from 'next/router';
import PageFrame from "../../../components/PageFrame";
import ChatAnalysesPage from "../../../components/Pages/Settings/Pages/ChatAnalyses/Analyses/ChatAnalysesPage";

export default function WordGroupChatAnalyses(): ReactElement {
    const router = useRouter();
    const { wordGroupId } = router.query;
    
    if(wordGroupId) {
        return <PageFrame title={'Chat Analyses'}>
            <div className={'pageContent'}>
                <div className={'content'}>
                    <ChatAnalysesPage wordGroupId={+wordGroupId} />
                </div>
            </div>

            <style jsx>{`
                .pageContent {
                    height: 100vh;
                    display: flex;
                    align-items: stretch;
                }    
                .content {
                    flex-grow: 1;
                    width: 100%;
                }    
            `}</style>
        </PageFrame>;
    }

    return <>Unknown word group id</>;
}