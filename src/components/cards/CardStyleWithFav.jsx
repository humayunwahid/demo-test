import { memo, useState,useCallback } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { auth, isAuthenticated } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { getConfig } from '../../../config';
import { ShareLink } from 'react-facebook-share-link';

const CardStyleWithFav = memo(({ title, movieTime, watchlistLink, link, image, seriesType, id, isFavorite: initialFavoriteState, name }) => {
  // alert(name);
  
  const config = getConfig();
  const [user] = useAuthState(auth);

  const [isFavorite, setIsFavorite] = useState(initialFavoriteState);
  const [copied, setCopied] = useState(false);
  const Authenticated = isAuthenticated();
  const loginRequired = () => toast('Login Required!', { icon: '👤' });
  const baseLink = window.location.origin;
  const shareLink = config.sharingURI+id;

  const copyLinkToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Copied!');
  };

  const toggleFavorite = useCallback(async () => {
    if (!Authenticated) {
      toast('Login Required!', { icon: '👤' });
      return;
    }
  
    const payload = { userId: user.uid, seriesId: id };
  
    try {
      setIsFavorite((prev) => !prev); // Optimistically toggle favorite
      const response = await axios.post('https://demo-api.aryzap.com/api/fav/cda', payload);

      if (response.status === 200 || response.status === 201) {
        if (response.data.message === "Favorite added successfully") {
          toast('Added to favorites!', { icon: '❤️' });
        } else if (response.data.message === "Favorite removed successfully") {
          toast('Removed from favorites!', { icon: '💔' });
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.response?.data || error.message);
      toast.error('Failed to toggle favorite!');
      setIsFavorite((prev) => !prev); // Revert optimistic update if failed
    }
  }, [Authenticated, id, user?.uid]);
  
  return (
    <div className="iq-card card-hover">
      <div className="block-images position-relative w-100">
        <div className="img-box w-100">
          <Link to={link} className="position-absolute top-0 bottom-0 start-0 end-0"></Link>
          <img src={image} alt={title} className="img-fluid object-cover w-100 d-block border-0" />
        </div>
        <div className="block-social-info align-items-center">
          <ul className="p-0 m-0 d-flex gap-2 music-play-lists">
            <li className="share position-relative d-flex align-items-center text-center mb-0">
              <span className="w-100 h-100 d-inline-block bg-transparent">
                <i className="fas fa-share-alt"></i>
              </span>
              
              <div className="share-wrapper">
                <div className="share-boxs d-inline-block">
                  <svg width="15" height="40" className="share-shape" viewBox="0 0 15 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.8842 40C6.82983 37.2868 1 29.3582 1 20C1 10.6418 6.82983 2.71323 14.8842 0H0V40H14.8842Z" fill="#191919"></path>
                  </svg>
                  <div className="overflow-hidden">
                    {shareLink ? (
                      <>
                        <FacebookShareButton url={shareLink}>
                          <FacebookIcon size={22} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareLink}>
                          <TwitterIcon size={22} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton url={shareLink}>
                          <WhatsappIcon size={22} round={true} />
                        </WhatsappShareButton>
                        <Link onClick={() => copyLinkToClipboard(shareLink)}>
                          <i className="fas fa-link"></i>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
            {(seriesType === "show"  || seriesType === "programs") && (
              <li className="share position-relative d-flex align-items-center text-center mb-0">
                <span className="w-100 h-100 d-inline-block bg-transparent" onClick={toggleFavorite}>
                  {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                </span>
              </li>
            )}
          </ul>
          <div className="iq-button">
            <Link to={link} className="btn text-uppercase position-relative rounded-circle">
              <i className="fa-solid fa-play ms-0"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

CardStyleWithFav.displayName = "CardStyleWithFav";
export default CardStyleWithFav;