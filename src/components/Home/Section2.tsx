import { useAccount } from "wagmi";
import tokenomic from "../../assets/imgs/tokenomic.png";

export const Section2 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section2 flex-c wrap">
      <div className="content">
        <div className="section-title flex-ac">
          {/* <div className="label">TOKENOMICS</div> */}
          <span>TOKENOMICS</span>
          <a
            href="https://changjuihuan.gitbook.io/eth-lottery/"
            className="white-paper-link"
            target="_blank"
          >
            White Paper Link
          </a>
        </div>
        {/* <img src={tokenomic} alt="" className="tokenomic" /> */}

        <div className="flex-as flex-jb wrap">
          <div style={{ width: "50%" }}>
            <div className="content-title">Seed money</div>
            <div className="content-desc" style={{ paddingRight: "30px" }}>
              1. Source of Funds: NFTs selling profit
              <br />
              2. 95% for Lending protocol or Stablecoin Protocol, 5% for
              platform operation
              <br />
              3. 0.3 ETH / NFT (10000 NFTs)
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div className="content-title">Lottery</div>
            <div className="content-desc">
              1. Once a week
              <br />
              2. Selling info: 200 token (160 token for NFT holder)
            </div>
          </div>
          <div style={{ width: "100%", marginTop: "2rem" }}>
            <div className="content-title">Rewards</div>
            <div className="content-desc">
              <strong>Source: </strong>profits from Lending/Stablecoin Protocol
              <br />
              <strong>Rewards Distribution: </strong>
              95% for lottery winner, 2% for participants with NFT, 2% for for
              cash pooling, 1% for platform operation
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
