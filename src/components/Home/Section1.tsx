import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import nft1 from "../../assets/imgs/nft1.jpeg";
import nft2 from "../../assets/imgs/nft2.jpeg";
import nft3 from "../../assets/imgs/nft3.jpeg";
import kv from "../../assets/imgs/kv.jpg";

export const Section1 = () => {
  const [{ data: accountData }] = useAccount();
  const navigate = useNavigate();
  return (
    <div className="section1 flex-c wrap">
      <img
        src={kv}
        width="100%"
        alt=""
        style={{ position: "absolute", zIndex: -1 }}
      />

      <div
        className="section1-title2"
        style={{ fontWeight: 400, letterSpacing: "2px" }}
      >
        <span>ETH Lottery</span> - Best lottery platform backed by Ethereum
        {/* <div className="rocket">🚀</div> */}
      </div>

      <div
        className="section1-subtitle2"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <br /> A decentralized, reliable and sustainable lottery platform backed
        by Ethereum
      </div>
      <div
        className="section1-subtitle2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Let all players maximize benefits and keep your assets liquid
      </div>

      {/* <img src={nft1} alt="" className="nft-img1" />
      <img src={nft2} alt="" className="nft-img2" />
      <img src={nft3} alt="" className="nft-img3" /> */}
      {accountData?.address ? (
        <div className="section1-btns2 flex-ac flex-ja">
          {/* <div
            className="btn-primary"
            onClick={() => navigate(`/profile?type=myitems`)}
          >
            Loan To Earn
          </div>
          <div
            className="btn-default"
            onClick={() => navigate(`/profile?type=all`)}
          >
            Borrow NFT
          </div> */}
        </div>
      ) : (
        <div className="section1-btns2 flex-ac flex-ja">
          <div className="connect-hint">Please connect wallet</div>
        </div>
      )}
    </div>
  );
};
