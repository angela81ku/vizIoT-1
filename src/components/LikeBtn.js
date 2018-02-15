import React from 'react';

export default class LikeBtn extends React.Component {
  state = {
    hover: false,
  };

  onHover = () => {
    this.setState(() => ({ hover: true }));
  };

  onLeaveHover = () => {
    this.setState(() => ({ hover: false }));
  };

  render() {
    console.log(`this.props.toggledLike ${this.props.toggledLike}`);
    const likeIsOn = this.props.toggledLike;
    const likeButtonTemplate = (
      <div
        className={
          'like-container noselect ' + (likeIsOn ? 'likeIsOn' : 'likeIsOff')
        }
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeaveHover}
        onClick={this.props.onClick}
      >
        <div className="like__icon-ctn unchecked" id="like-cnt">
          <i className="material-icons like__icon">
            {this.props.toggledLike ? 'favorite' : 'favorite_border'}
          </i>
          {/*<svg aria-labelledby="js_of" version="1.1" viewBox="-1 -1 40.16 42.24" preserveAspectRatio="xMinYMax meet">*/}
          {/*<title id="js_of">Thumbs Up Sign</title>*/}
          {/*<path d="M935.36,1582.44a0,0,0,0,0,0,.06,3.59,3.59,0,0,1-.72,6.53,0,0,0,0,0,0,0,3.56,3.56,0,0,1,.71,2.13,3.6,3.6,0,0,1-3,3.54, 0,0,0,0,0,0,.05,3.56,3.56,0,0,1,.38,1.61,3.61,3.61,0,0,1-3.42,3.6H910v-19.6l5.27-7.9a4,4,0,0,0,.66-2.31l-0.1-4c-0.22-2.4-.09-2.06, 1.13-2.37,2-.51,7.16,1.59,5.13,12.17h11.06A3.59,3.59,0,0,1,935.36,1582.44ZM899,1581h7v22h-7v-22Z"*/}
          {/*transform="translate(-898.5 -1563.26)"*/}
          {/*fill="transparent" fillRule="evenodd"*/}
          {/*stroke="#475d89" strokeLinecap="round"*/}
          {/*strokeWidth="5%"/>*/}
          {/*</svg>*/}
        </div>
        <span className="like__count">{this.props.likes}</span>
      </div>
    );
    return likeButtonTemplate;
  }
}
