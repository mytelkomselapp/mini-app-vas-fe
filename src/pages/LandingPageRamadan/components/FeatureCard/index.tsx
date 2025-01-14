const FeatureCard = ({ icon, name, handleClick }) => (
  <div
    className="flex flex-col items-center justify-center border rounded-lg bg-[#F3F5F9] pt-2 w-[79.75px] h-[64px]"
    onClick={() => handleClick()}
  >
    <div className="text-2xl leading-[24px] mb-1">{icon}</div>
    <p className="text-center text-[10px] font-batikSans font-normal whitespace-pre mb-2">
      {name}
    </p>
  </div>
);
export default FeatureCard;
