import React, { useState } from 'react';
import {
  EmailShareButton, FacebookIcon,
  FacebookShareButton, LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import {
  AiOutlineCloseCircle, GoMail, IoLogoWhatsapp, SiTwitter, GrFacebook, FaLinkedin, ImTelegram
} from 'react-icons/all';
import IconButton from '@material-ui/core/IconButton';
import SimpleSnackbar from '../../microComponents/snackBar';
import { stringCaps } from '../../../utilities/stringOperations';

const ShareTemp = ({ project, handleClose }) => {
  const [url] = useState(`${process.env.REACT_APP_BASE_URL}project/details/${project.id}/1`);
  const [open, setOpen] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(url);
    setOpen(true);
  };
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-content-center">
          <p className="h1 bold py-3">You can help to share</p>
          <div>
            <IconButton onClick={handleClose} className="text-danger" type="button">
              <AiOutlineCloseCircle />
            </IconButton>
          </div>
        </div>
        <small>
          copy link below
        </small>
        <div className="d-flex mt-2">

          <div className="border-wema p-2 mr-2">{url}</div>
          <div className="">
            <button type="button" className="btn" onClick={copyText}>Copy</button>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <p className="bold">You can also share directly to your social media</p>
        <div className="row py-2">
          <div className="col-md-4 col-sm-3 mt-2">
            <LinkedinShareButton url={url} className="social-btn linkedIn">
              <FaLinkedin className="social-icon" size={52} />
              <p className="social-name">LinkedIn</p>
            </LinkedinShareButton>
          </div>
          <div className="col-md-4 col-sm-3 mt-2">
            <FacebookShareButton url={url} className="social-btn facebook">
              <GrFacebook className="social-icon" size={52} />
              <p className="social-name">Facebook</p>
            </FacebookShareButton>
          </div>
          <div className="col-md-4 col-sm-3 mt-2">
            <TwitterShareButton url={url} className="social-btn twitter">
              <SiTwitter className="social-icon" size={52} />
              <p className="social-name">Twitter</p>
            </TwitterShareButton>
          </div>
          <div className="col-md-4 col-sm-3 mt-2">
            <TelegramShareButton url={url} className="social-btn telegram">
              <ImTelegram className="social-icon" size={52} />
              <p className="social-name">Telegram</p>
            </TelegramShareButton>
          </div>
          <div className="col-md-4 col-sm-3 mt-2">
            <WhatsappShareButton url={url} className="social-btn whatsapp">
              <IoLogoWhatsapp className="social-icon" size={52} />
              <p className="social-name">WhatsApp</p>
            </WhatsappShareButton>
          </div>
          <div className="col-md-4 col-sm-3 mt-2">
            <EmailShareButton className="social-btn email" subject={stringCaps(project.title)} body={`Good day, I invite you to join us in raising the sum of ${project.donationTarget} to support ${project.title} project. Your contribution will be greatly appreciated`}>
              <GoMail className="social-icon" size={52} />
              <p className="social-name">Email</p>
            </EmailShareButton>
          </div>
        </div>
      </div>
      <SimpleSnackbar open={open} setOpen={setOpen} message="copied to clipboard" />
    </div>
  );
};
export default ShareTemp;
