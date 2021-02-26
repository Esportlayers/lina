import { FC, ReactElement, useCallback, useState } from "react";
import FullPageSlider, {
  FullPageSliderProps,
} from "../../Ui/fullpageslide/FullPageSlide";

import DownloadConfig from "./Sections/DownloadConfig";
import LocateConfig from "./Sections/LocateConfig";
import OverlayLinks from "./Sections/OverlayLinks";
import WaitingForConnection from "./Sections/WaitingForConnection";
import Welcome from "./Sections/Welcome";
import { useRouter } from "next/router";

const pages: FC<FullPageSliderProps>[] = [
  Welcome,
  DownloadConfig,
  LocateConfig,
  WaitingForConnection,
  OverlayLinks,
];

export default function WelcomeScreen(): ReactElement {
  const router = useRouter();
  const onFinish = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return <FullPageSlider pages={pages} onFinish={onFinish} />;
}
