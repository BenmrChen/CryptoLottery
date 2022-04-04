import { useAccount } from "wagmi";
import tokenomic from "../../assets/imgs/tokenomic.png";
import team from "../../assets/imgs/team.jpg";

const members = [
  {
    name: "Benmr",
    job: "CEO<br/>Team Leader<br />Smart Contract Developer",
    // avatar: tz,
  },
  {
    name: "Astrid",
    job: "CMO",
    // avatar: grace,
  },
  {
    name: "Ocean",
    job: "CSO<br/>White Paper<br/>Tokenomic",
    // avatar: jill,
  },
  {
    name: "Grace",
    job: "Project Setup<br/>Homepage Developer",
    // avatar: linda,
  },
  {
    name: "Zoe ",
    job: "Tokenomic",
    // avatar: vincent,
  },
  {
    name: "",
    job: "",
    // avatar: tim,
  },
];
export const Section3 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section3 flex-ac flex-jb wrap">
      <div style={{ position: "absolute", zIndex: -1, opacity: "0.2" }}>
        <img src={team} width="100%" alt="" className="team" />
      </div>
      <div className="content">
        <div className="section-title">
          <span>Team</span>
        </div>
        <div className="flex-as flex-jb wrap">
          {members.map((member) => (
            <div className="card flex-ac" key={member.name}>
              <div>
                <div className="card-name">{member.name}</div>
                <div
                  className="card-content"
                  dangerouslySetInnerHTML={{ __html: member.job }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
