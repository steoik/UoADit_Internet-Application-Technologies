import './Review.css'

import DefaultProfile from '../assets/person_FILL0_wght300_GRAD0_opsz48.svg'

const Review = (props) => {

  const { username, date_created, body, avatar } = props;

  return (
    <div className="review">
      <div className="review_userInfo">
        <img src={DefaultProfile}></img>
        <div className="review_username-date">
          <p className="review__username">{username}</p>
          <p className="review__date">{date_created}</p>
        </div>
      </div>
      <div className="review__body">
        <p>{body}</p>
      </div>
    </div>
  )
}

export default Review;