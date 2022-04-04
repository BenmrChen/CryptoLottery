import { useAccount } from "wagmi";

export const Section4 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section4 flex-ac flex-jb wrap">
      <div className="content">
        <div className="section-title">
          {/* <div className="label">
            ROADMAP
          </div> */}
          <span>ROADMAP</span>
        </div>
        <div className="roadmap flex-ac flex-jb">
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">Feb. 2022</div>
            <div className="item-content">
              → Project planning
              <br />
            </div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">Mar.Apr. 2022</div>
            <div className="item-content">
              → Project Setup
              <br />
              → Smart contract
              <br />→ White Paper <br /> → Web Page
            </div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">Apr. 2022</div>
            <div className="item-content">→ project LAUNCH</div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">Q2</div>
            <div className="item-content">
              → NFT public mint
              <br />
              → Improve contract and web
              <br />→ More & more ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
