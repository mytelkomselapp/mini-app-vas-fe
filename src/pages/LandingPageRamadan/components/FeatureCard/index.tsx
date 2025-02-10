const FeatureCard = ({ icon, name, handleClick }) => (
  <div
    className="flex flex-col items-center justify-center border rounded-lg bg-[#F3F5F9] pt-2 w-[79.75px] h-[64px]"
    onClick={() => handleClick()}
  >
    <div>
      <img src={icon} className="w-7 h-7" alt={name} />
    </div>
    <p className="text-center text-[10px] font-batikSans font-normal whitespace-pre mb-2">
      {name}
    </p>
  </div>
);
export default FeatureCard;
