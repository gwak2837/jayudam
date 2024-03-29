import { useState } from 'react'

type Props = {
  a: any
}

export default Popup

function Popup({ a }: Props) {
  const [isOpened, setIsOpened] = useState(false)

  function openPopup() {
    setIsOpened(true)
  }

  function closePopup() {
    setIsOpened(false)
  }

  return (
    <div className="container">
      <div className="email" onClick={openPopup}>
        <div className="from">
          <div className="from-contents">
            <div className="avatar" />
            <div className="name">Mikael Ainalem</div>
          </div>
        </div>
        <div className="to">
          <div className="to-contents">
            <div className="top">
              <div className="avatar-large" />
              <div className="name-large">Mikael Ainalem</div>
              <div className="x-touch" onClick={closePopup}>
                <div className="x">
                  <div className="line1" />
                  <div className="line2" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="row">
                <div className="link">
                  <a href="https://twitter.com/mikaelainalem">@mikaelainalem</a>
                </div>
              </div>
              <div className="row">
                <div className="link">
                  <a href="https://medium.com/@mikael_ainalem">@mikael_ainalem</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

;`
.container {
  align-items: center;
  /*       background: #F1EEF1;
  border: 1px solid #D2D1D4;
  */      display: flex;
  height: 360px;
  justify-content: center;
  width: 360px;
}
.email {
  background: #DEDBDF;
  border-radius: 16px;
  height: 32px;
  overflow: hidden;
  position: relative;
  width: 162px;
  -webkit-tap-highlight-color: transparent;
  transition: width 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
    height 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
    box-shadow 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
    border-radius 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.email:not(.expand) {
  cursor: pointer;
}
.email:not(.expand):hover {
  background: #C2C0C2;
}
.from {
  position: absolute;
  transition: opacity 200ms 100ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
.from-contents {
  display: flex;
  flex-direction: row;
  transform-origin: 0 0;
  transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.to {
  opacity: 0;
  position: absolute;
  transition: opacity 100ms cubic-bezier(0.4, 0.0, 1, 1);
}
.to-contents {
  transform: scale(.55);
  transform-origin: 0 0;
  transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.avatar {
  border-radius: 12px;
  height: 24px;
  left: 6px;
  position: relative;
  top: 4px;
  width: 24px;
}
.name {
  font-size: 14px;
  line-height: 32px;
  margin-left: 10px;
}
.top {
  background: #6422EB;
  display: flex;
  flex-direction: row;
  height: 70px;
  transition: height 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  width: 300px;
}
.avatar-large {
  border-radius: 21px;
  height: 42px;
  margin-left: 12px;
  position: relative;
  top: 14px;
  width: 42px;
}
.name-large {
  color: #efd8ef;
  font-size: 16px;
  line-height: 70px;
  margin-left: 20px;
}
.x-touch {
  align-items: center;
  align-self: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  margin-left: auto;
  width: 50px;
}
.x {
  background: #BA87F9;
  border-radius: 10px;
  height: 20px;
  position: relative;
  width: 20px;
}
.x-touch:hover .x {
  background: #CB9AFB;
}
.line1 {
  background: #6422EB;
  height: 12px;
  position: absolute;
  transform: translateX(9px) translateY(4px) rotate(45deg);
  width: 2px;
}
.line2 {
  background: #6422EB;
  height: 12px;
  position: absolute;
  transform: translateX(9px) translateY(4px) rotate(-45deg);
  width: 2px;
}
.bottom {
  background: #FFF;
  color:  #444247;
  font-size: 14px;
  height: 200px;
  padding-top: 5px;
  width: 300px;
}
.row {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 60px;
}
.twitter {
  margin-left: 16px;
  height: 30px;
  position: relative;
  top: 0px;
  width: 30px;
}
.medium {
  height: 30px;
  margin-left: 16px;
  position: relative;
  width: 30px;
}
.link {
  margin-left: 16px;
}
.link a {
  color:  #444247;
  text-decoration: none;
}
.link a:hover {
  color:  #777579;
}
.email.expand {
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.10), 0 6px 6px rgba(0,0,0,0.16);
  height: 200px;
  width: 300px;
}
.expand .from {
  opacity: 0;
  transition: opacity 100ms cubic-bezier(0.4, 0.0, 1, 1);
}
.expand .from-contents {
  transform: scale(1.91);
}
.expand .to {
  opacity: 1;
  transition: opacity 200ms 100ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
.expand .to-contents {
  transform: scale(1);
}
`
