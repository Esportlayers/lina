
import { ReactElement } from "react";
import { getDefaultHeader } from "../../../../modules/middleware/Network";
import Button from "../../../Ui/button/Button";
import Container from "../../../Ui/container/Container";
import { FullPageSliderProps } from "../../../Ui/fullpageslide/FullPageSlide";
import NudgeFromBottom from "../../../Ui/motion/NudgeFromBottom";

async function downloadGsiConfig(): Promise<void> {
    const response = await fetch(process.env.API_URL + '/dota-gsi/generateConfig', {headers: getDefaultHeader()});
    const filename = response.headers.get('Content-Disposition').split('filename=')[1];
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();    
    a.remove();
}

export default function DownloadConfig({onContinue}: FullPageSliderProps): ReactElement {
    const onLoadGsi = async () => {
        await downloadGsiConfig();
        onContinue();
    };
    
    return <Container>
        <NudgeFromBottom delay={.2}>
            <h2>Download the GSI config file</h2>
        </NudgeFromBottom>

        <br />
        <br />
        <br />

        <NudgeFromBottom delay={.3}>
            <Button onClick={onLoadGsi} big>
                Download
            </Button>
        </NudgeFromBottom>
    </Container>
}