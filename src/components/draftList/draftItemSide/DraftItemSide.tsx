import React, { FC } from 'react';
import './draftitemside.scss'
import { useAppSelector } from "../../../hooks";
import { IDraft } from "../../../types/draft-type";
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en)

interface DraftItemProps {
  draftItem: IDraft;
  displayImage?: boolean;
  isMobile: boolean;
}

const DraftItemSide: FC<DraftItemProps> = ({ draftItem, displayImage, isMobile}) => {
  const { draft } = useAppSelector(state => state.currentDraft)

  return (
    <div className={`draftItemSideContainer ${draft.id === draftItem.id ? "draftItemSideContainerSelected" : ""} ${isMobile? "draftItemSideContainerMobile" : "draftItemSideContainer"}`}>
      <div className="insideContainer">
        <div className="title">
          {draftItem.title}

        </div>
        <div className="description">
          {draftItem.description}

        </div>
        <div className="text">
          {draftItem.text}

        </div>
        {draftItem.date_and_time_edited ?

          <div className="timeContainer">
            <span className='datetime'>
              {<ReactTimeAgo date={draftItem.date_and_time_edited} locale="en-US" />}
            </span>
          </div>
          :
          <div className="timeContainer">
            <span className='datetime'>
              {<ReactTimeAgo date={draftItem.date_and_time_published} locale="en-US" />}
            </span>

          </div>
        }
      </div>
    </div>
  );
};

export default DraftItemSide;