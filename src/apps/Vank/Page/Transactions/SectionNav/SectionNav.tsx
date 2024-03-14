import { useNavigate } from "react-router-dom";

export const SectionNav = ({
  className,
  onClikVanPay,
  onClickDeposit,
  apply,
}: {
  className?: string;
  onClikVanPay?: any;
  onClickDeposit?: any;
  apply?: any;
}) => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <nav className={className}>
      <ul className="flex  justify-between text-[16px] text-link xl:max-2xl:text-sm">
        <li>
          <button onClick={returnHome}>Back</button>
        </li>
        <li>
          <button
            onClick={onClickDeposit}
            className={`${
              apply == 1 &&
              "text-[#FFED00] font-[700] border-b-[2px] border-[#FFED00]"
            } `}
          >
            Deposit
          </button>
        </li>
        <li>
          <button>Withdraw</button>
        </li>
        <li>
          <button>Convert</button>
        </li>
        <li>
          <button
            onClick={onClikVanPay}
            className={`${
              apply == 4 &&
              "text-[#FFED00] font-[700] border-b-[2px] border-[#FFED00]"
            } `}
          >
            VankPay
          </button>
        </li>
      </ul>
    </nav>
  );
};
