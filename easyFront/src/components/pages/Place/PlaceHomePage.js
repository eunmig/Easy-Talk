// PlaceHomePage.js

import InputBar from "../../UI/modules/InputBar";
import SNSInputBox from "../../UI/modules/SNSInputBox/SNSInputBox";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Icon from "../../UI/atoms/Icon/Icon";
// import Profile from "../../UI/modules/Profile/Profile";

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PlaceHomePage = () => {
  const navigate = useNavigate();

  const [hasNeighbors, setHasNeighbors] = useState(false);
  const [myFeed, setmyFeed] = useState([]);

  useEffect(() => {
    const fetchMyFeed = async () => {
      try {
        const params = {
          type: "List",
        };

        const response = await axios.get("/neighbor/feed", { params }, { withCredentials: true });

        setmyFeed(response.data);
      } catch (error) {
        console.log("Error myFeed", error);
      }
    };

    fetchMyFeed();
  }, []);

  return (
    <>
      <div className="PlaceHomePage">
        {/* 이웃이 있는지 여부에 따라 다른 내용을 렌더링 */}
        {hasNeighbors ? (
          <>
            <InputBar variant="searchinputbar" uri="/neighbor/search/" />
            <SNSInputBox
              type="post"
              // onContentChange={(value) => setContent(value)}
              // onImagesChange={(value) => setImages(value)}
              // onPost={handlePost}
            />
            <div>
            { myFeed.map((feed) => (
            // 클릭하면 게시글 수정 페이지로 이동
                <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
                  <FeedBox
                    key={feed.feedId}
                    userId={feed.userId} // userId가 있다고 가정합니다.
                    feedId={feed.feedId}
                    profileImg={feed.profileImageUri}
                    nickname={feed.nickname}
                    isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                    likeCount={feed.heartCount}
                    commentCount={feed.commentCount}
                    content={feed.content}
                    createdDate={feed.registerDate}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <br />
            <Icon name="warningIcon" />
            <p>아직 내 이웃이 없습니다! 내 이웃을 추가해주세요.</p>
            <InputBar variant="searchinputbar" uri="/neighbor/search/" />
            <SNSInputBox
              type="post"
              // userId={userId}
              // onContentChange={(value) => setContent(value)}
              // onImagesChange={(value) => setImages(value)}
              // onPost={handlePost}
            />
            <div>
            { myFeed && myFeed.map((feed) => (
            // 클릭하면 게시글 수정 페이지로 이동
                <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
                  <FeedBox
                    userId={feed.userId} // userId가 있다고 가정합니다.
                    feedId={feed.feedId}
                    targetUserId={feed.targetUserId}
                    profileImgageUri={feed.profileImageUri}
                    feedImageUris={feed.feedImageUris}
                    nickname={feed.nickname}
                    isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                    heartCount={feed.heartCount}
                    commentCount={feed.commentCount}
                    content={feed.content}
                    registerDate={feed.registerDate}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}


export default PlaceHomePage;