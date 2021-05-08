import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import classNames from "classnames";

interface Props {
  active: string;
}

const items = [
  {
    name: "Account",
    page: "account",
    type: "page",
  },
  {
    name: "General",
    type: "header",
  },
  {
    name: "Bot Commands",
    page: "botCommands",
    type: "page",
  },
  {
    name: "Vote system",
    page: "voteSystem",
    type: "page",
  },
  {
    name: "Twitch Predictions",
    page: "predictions",
    type: "page",
  },
  {
    name: "Keyword listener",
    page: "keywordListener",
    type: "page",
  },
  {
    name: "Chat analyses",
    page: "chatAnalyses",
    type: "page",
  },
  {
    name: "Gameplay tools",
    type: "header",
  },
  {
    name: "W/L Stats",
    page: "wLStats",
    type: "page",
  },
  {
    name: "Anti snipe overlay",
    page: "antiSnipe",
    type: "page",
  },
  {
    name: "Caster tools",
    type: "header",
  },
  {
    name: "Roshan Timer",
    page: "roshanTimer",
    type: "page",
  },
  {
    name: "Draft Stats",
    page: "draftStats",
    type: "page",
  },
  {
    name: "Hero Stats",
    page: "heroStats",
    type: "page",
  },
];

export default function SettingsNavigation({ active }: Props): ReactElement {
  return (
    <div className={"menu"}>
      <div className={"menuHeader"}>
        <Image src={"/logo.PNG"} width={60} height={60} alt={"logo"} />
        <div className={"title"}>StreamDota</div>
      </div>

      <Link href={"/dashboard"}>
        <div className={"item page"}>Back to Dashboard</div>
      </Link>

      <div className={"list"}>
        {items.map(({ name, page, type }) => {
          if (type === "header") {
            return (
              <div className={classNames("item", type)} key={name}>
                {name}
              </div>
            );
          }
          return (
            <Link href={"/settings/" + page} key={name}>
              <div
                className={classNames("item", type, {
                  active: type === "page" && page === active,
                })}
              >
                {name}
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .item {
          padding: 0.5rem 1rem;
          margin: 0.25rem 0;
          border-left: 4px solid transparent;
          font-size: 0.9rem;
          transition: all 120ms ease-in-out;
        }

        .header {
          margin-top: 1.75rem;
          text-transform: uppercase;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .page.item:not(.active):hover {
          background-color: rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .active {
          color: var(--primary-accent);
          border-left-color: var(--primary-accent);
          font-weight: bold;
        }

        .menuHeader {
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          margin-bottom: 2rem;
        }

        .title {
          font-size: 1.4rem;
          margin-left: 0.5rem;
        }

        .menu {
          background-color: var(--anthrazit);
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
          height: 100%;
          width: 15rem;
        }
      `}</style>
    </div>
  );
}
